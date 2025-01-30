import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CacheModule } from '@nestjs/cache-manager';
import { InstitutionsController } from './institutions.controller';
import { InstitutionsMongoDbService } from './institutions.mongodb.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Institution, InstitutionSchema } from '../shared/schemas/institution.schema';
import { InstitutionType } from '../shared/models/institutionType';
import { SortParams } from './params/sortParams';

describe('InstitutionsController (e2e)', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let mongod: MongoMemoryServer;
  let institutionsService: InstitutionsMongoDbService;
  let cacheManager: Cache;
  let institutionModel: Model<Institution>;

  const mockInstitutions = [
    {
      id: 1,
      institutionType: InstitutionType.NURSERY,
      name: "Happy Kids",
      website: "www.happykids.com",
      email: "contact@happykids.com",
      phone: "123456789",
      basicPricePerMonth: 1000,
      basicPricePerHour: 15,
      isAdaptedToDisabledChildren: true,
      capacity: 50,
      kidsEnrolled: 40,
      rating: 4.5,
      address: {
        city: "Warsaw",
        voivodeship: "Mazowieckie",
        street: "Main St",
        buildingNumber: "1",
        pin: {
          longitude: 20.4543,
          latitude: 52.2297
        }
      }
    },
    {
      id: 2,
      institutionType: InstitutionType.CHILDCLUB,
      name: "Sunshine Club",
      website: "www.sunshineclub.com",
      email: "contact@sunshineclub.com",
      phone: "987654321",
      basicPricePerMonth: 1200,
      basicPricePerHour: 20,
      isAdaptedToDisabledChildren: false,
      capacity: 30,
      kidsEnrolled: 30,
      rating: 4.0,
      address: {
        city: "Krakow",
        voivodeship: "Malopolskie",
        street: "Side St",
        buildingNumber: "2",
        pin: {
          longitude: 19.9449,
          latitude: 50.0647
        }
      }
    }
  ];

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
      controllers: [InstitutionsController],
      providers: [InstitutionsMongoDbService],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    institutionsService = moduleRef.get<InstitutionsMongoDbService>(InstitutionsMongoDbService);
    cacheManager = moduleRef.get<Cache>(CACHE_MANAGER);
    institutionModel = moduleRef.get<Model<Institution>>(getModelToken(Institution.name));

    // Silence console.log during tests
    jest.spyOn(console, 'log').mockImplementation(() => { });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    await app.close();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    await institutionModel.create(mockInstitutions);
  });

  afterEach(async () => {
    await cacheManager.reset();
    await institutionModel.deleteMany({});
  });

  describe('GET /institutions', () => {
    it('should return paginated results with default parameters', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions')
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          items: expect.any(Array),
          totalItems: 2,
          pageIndex: 1,
          pageSize: 10,
          totalPages: 1
        })
      );
    });

    it('should filter by city', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions')
        .query({ city: 'Warsaw' })
        .expect(200);

      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].city).toBe('Warsaw');
    });

    it('should filter by institution type', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions')
        .query({ insType: [InstitutionType.NURSERY] })
        .expect(200);

      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].institutionType).toBe(InstitutionType.NURSERY);
    });

    it('should filter by price range', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions')
        .query({ priceMin: 1100, priceMax: 1300 })
        .expect(200);

      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].basicPricePerMonth).toBe(1200);
    });

    it('should sort by price ascending', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions')
        .query({ sort: SortParams.PRICE_ASC })
        .expect(200);

      const prices = response.body.items.map(item => item.basicPricePerMonth);
      expect(prices).toEqual([1000, 1200]);
    });

    it('should use cache on subsequent requests', async () => {
      const findAllSpy = jest.spyOn(institutionsService, 'findAll');

      await request(app.getHttpServer())
        .get('/institutions')
        .expect(200);

      await request(app.getHttpServer())
        .get('/institutions')
        .expect(200);

      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /institutions/details/:id', () => {
    it('should return institution by id', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions/details/1')
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: 1,
          name: 'Happy Kids'
        })
      );
    });

    it('should return 404 for non-existent institution', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions/details/999')
        .expect(404);

      expect(response.body.message).toBe('Institution with id 999 not found');
    });

    it('should return 400 for invalid id format', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions/details/invalid')
        .expect(400);

      expect(response.body.message).toBe('Id parameter must be a correct number');
    });
  });

  describe('GET /institutions/details', () => {
    it('should return multiple institutions by ids', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions/details')
        .query({ id: [1, 2] })
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body.map(inst => inst.id)).toEqual([1, 2]);
    });

    it('should return 400 when more than 5 ids are requested', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions/details')
        .query({ id: [1, 2, 3, 4, 5, 6] })
        .expect(400);

      expect(response.body.message).toBe('Maximum 5 ids can be passed');
    });
  });

  describe('GET /institutions/details', () => {
    it('should return multiple institutions by ids', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions/details')
        .query({ id: [1, 2] })
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body.map(inst => inst.id)).toEqual([1, 2]);
    });

    it('should return rejection message when more than 5 ids are requested', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions/details')
        .query({ id: [1, 2, 3, 4, 5, 6] })
        .expect(400);

      expect(response.body.message).toBe('Maximum 5 ids can be passed');
    });
  });

  describe('GET /institutions/autocomplete', () => {
    it('should return matching institutions', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions/autocomplete')
        .query({ search: 'Happy' })
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toEqual({
        id: 1,
        name: 'Happy Kids'
      });
    });

    it('should perform case-insensitive search', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions/autocomplete')
        .query({ search: 'happy' })
        .expect(200);

      expect(response.body).toHaveLength(1);
    });

    it('should return empty array for no matches', async () => {
      const response = await request(app.getHttpServer())
        .get('/institutions/autocomplete')
        .query({ search: 'NonExistent' })
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });
});