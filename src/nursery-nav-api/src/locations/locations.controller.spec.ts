import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CacheModule } from '@nestjs/cache-manager';
import { LocationsController } from './locations.controller';
import { LocationsMongoDbService } from './locations.mongodb.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { LocationDto } from './DTO/locationDto';
import { InstitutionType } from '../shared/models/institutionType';
import { Institution, InstitutionSchema } from '../shared/schemas/institution.schema';

describe('LocationsController (e2e)', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let mongod: MongoMemoryServer;
  let locationsService: LocationsMongoDbService;
  let cacheManager: Cache;
  let institutionModel: Model<Institution>;

  const mockInstitutions = [
    {
      id: 1,
      institutionType: InstitutionType.NURSERY,
      address: {
        pin: {
          longitude: 20.4543,
          latitude: 52.2297
        }
      }
    },
    {
      id: 2,
      institutionType: InstitutionType.CHILDCLUB,
      address: {
        pin: {
          longitude: 19.9449,
          latitude: 50.0647
        }
      }
    }
  ];

  const expectedDtos: LocationDto[] = mockInstitutions.map(inst => ({
    id: inst.id,
    institutionType: inst.institutionType,
    longitude: inst.address.pin.longitude,
    latitude: inst.address.pin.latitude
  }));

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }]),
        CacheModule.register({
          ttl: 30,
          max: 100,
        })
      ],
      controllers: [LocationsController],
      providers: [LocationsMongoDbService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    locationsService = moduleRef.get<LocationsMongoDbService>(LocationsMongoDbService);
    cacheManager = moduleRef.get<Cache>(CACHE_MANAGER);
    institutionModel = moduleRef.get<Model<Institution>>(getModelToken(Institution.name));
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await cacheManager.reset();
    await institutionModel.deleteMany({});
  });

  describe('GET /locations', () => {
    it('should return an empty array when no locations exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/locations')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return array of locations with correct DTO structure', async () => {
      await institutionModel.create(mockInstitutions);

      const response = await request(app.getHttpServer())
        .get('/locations')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body).toEqual(
        expect.arrayContaining(expectedDtos.map(dto =>
          expect.objectContaining({
            id: dto.id,
            institutionType: dto.institutionType,
            longitude: dto.longitude,
            latitude: dto.latitude
          })
        ))
      );
    });

    it('should use cache on subsequent requests', async () => {
      const findAllSpy = jest.spyOn(locationsService, 'findAll');
      await institutionModel.create(mockInstitutions);

      // First request - should hit database
      const firstResponse = await request(app.getHttpServer())
        .get('/locations')
        .expect(200);

      // Second request - should use cache
      const secondResponse = await request(app.getHttpServer())
        .get('/locations')
        .expect(200);

      expect(findAllSpy).toHaveBeenCalledTimes(1);
      expect(secondResponse.body).toEqual(firstResponse.body);
    });

    it('should validate the numeric range of coordinates', async () => {
      await institutionModel.create(mockInstitutions);

      const response = await request(app.getHttpServer())
        .get('/locations')
        .expect(200);

      response.body.forEach((location: LocationDto) => {
        expect(location.longitude).toBeGreaterThanOrEqual(-180);
        expect(location.longitude).toBeLessThanOrEqual(180);
        expect(location.latitude).toBeGreaterThanOrEqual(-90);
        expect(location.latitude).toBeLessThanOrEqual(90);
      });
    });

    it('should refresh cache after manual invalidation', async () => {
      const findAllSpy = jest.spyOn(locationsService, 'findAll');
      await institutionModel.create(mockInstitutions);

      // First request
      await request(app.getHttpServer())
        .get('/locations')
        .expect(200);

      // Manually clear cache
      await cacheManager.reset();

      // Second request after cache clear
      await request(app.getHttpServer())
        .get('/locations')
        .expect(200);

      expect(findAllSpy).toHaveBeenCalledTimes(2);
    });
  });
});