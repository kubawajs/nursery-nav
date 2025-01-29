import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CacheModule } from '@nestjs/cache-manager';
import { CitiesController } from './cities.controller';
import { CitiesMongoDbService } from './cities.mongodb.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CityDto } from './DTO/cityDto';
import { City, CitySchema } from '../shared/schemas/city.schema';

describe('CitiesController (e2e)', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let mongod: MongoMemoryServer;
  let citiesService: CitiesMongoDbService;
  let cacheManager: Cache;
  let cityModel: Model<City>;

  const mockCities: CityDto[] = [
    {
      voivodeship: 'Mazowieckie',
      county: 'Warsaw',
      community: 'Warsaw',
      city: 'Warsaw'
    },
    {
      voivodeship: 'Małopolskie',
      county: 'Kraków',
      community: 'Kraków',
      city: 'Kraków'
    }
  ];

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
        CacheModule.register({
          ttl: 30,
          max: 100,
        })
      ],
      controllers: [CitiesController],
      providers: [CitiesMongoDbService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    citiesService = moduleRef.get<CitiesMongoDbService>(CitiesMongoDbService);
    cacheManager = moduleRef.get<Cache>(CACHE_MANAGER);
    cityModel = moduleRef.get<Model<City>>(getModelToken(City.name));
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    await app.close();
  });

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await cacheManager.reset();
    await cityModel.deleteMany({});
  });

  describe('GET /cities', () => {
    it('should return an empty array when no cities exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/cities')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return array of cities with correct DTO structure', async () => {
      await cityModel.create(mockCities);

      const response = await request(app.getHttpServer())
        .get('/cities')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          voivodeship: expect.any(String),
          county: expect.any(String),
          community: expect.any(String),
          city: expect.any(String)
        })
      ]));
    });

    it('should use cache on subsequent requests', async () => {
      const findAllSpy = jest.spyOn(citiesService, 'findAll');
      await cityModel.create(mockCities);

      // First request - should hit database
      const firstResponse = await request(app.getHttpServer())
        .get('/cities')
        .expect(200);

      // Second request - should use cache
      const secondResponse = await request(app.getHttpServer())
        .get('/cities')
        .expect(200);

      expect(findAllSpy).toHaveBeenCalledTimes(1);
      expect(secondResponse.body).toEqual(firstResponse.body);
    });

    it('should validate the structure of returned cities', async () => {
      await cityModel.create(mockCities);

      const response = await request(app.getHttpServer())
        .get('/cities')
        .expect('Content-Type', /json/)
        .expect(200);

      response.body.forEach((city: CityDto) => {
        expect(city).toMatchObject({
          voivodeship: expect.any(String),
          county: expect.any(String),
          community: expect.any(String),
          city: expect.any(String)
        });
      });
    });

    // Separate describe block for cache-specific tests
    describe('cache behavior', () => {
      it('should refresh cache after manual invalidation', async () => {
        const findAllSpy = jest.spyOn(citiesService, 'findAll');
        await cityModel.create(mockCities);

        // First request
        await request(app.getHttpServer())
          .get('/cities')
          .expect(200);

        // Manually clear cache
        await cacheManager.reset();

        // Second request after cache clear
        await request(app.getHttpServer())
          .get('/cities')
          .expect(200);

        // Service should be called twice: once for initial request, once after cache clear
        expect(findAllSpy).toHaveBeenCalledTimes(2);
      });
    });
  });
});