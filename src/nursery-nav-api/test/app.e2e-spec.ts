import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Status: running');
  });

  it('/institutions (GET)', () => {
    return request(app.getHttpServer())
      .get('/institutions')
      .expect(200)
  });

  it('/institutions/details/{id} (GET)', () => {
    return request(app.getHttpServer())
      .get('/institutions/details/1')
      .expect(200)
      .expect('');
  });

  it('/cities (GET}', () => {
    return request(app.getHttpServer())
      .get('/cities')
      .expect(200);
  });

  it('/locations (GET}', () => {
    return request(app.getHttpServer())
      .get('/locations')
      .expect(200);
  });

  it('/institutions/autocomplete (GET)', () => {
    return request(app.getHttpServer())
      .get('/institutions/autocomplete?search=test')
      .expect(200);
  });
});
