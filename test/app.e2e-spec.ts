import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies", () => {
    it('(GET)', () => {
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([]);
    })
    it('POST', () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: 'test_movie',
          year: 2000,
          genres: ['test']
        })
        .expect(201);
    });
    // GET
    it('GET with currect id > 200', () => {
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200);
    });
    it('GET with incorrect id > 404', () => {
      return request(app.getHttpServer())
      .get("/movies/-1")
      .expect(404);
    });
    // PATCH
    it('PATCH with correct id and correct data > 200', () => {
      return request(app.getHttpServer())
        .patch("/movies/1")
        .send({          
          title: "updateMovie",
          year: 1111,
          genres: ["edited genres", "etc"],
        }).expect(200);
    })
    it('PATCH with incorrect id > 404', () => {
      return request(app.getHttpServer())
        .patch("/movies/-1")
        .send({          
          title: "updateMovie",
          year: 1111,
          genres: ["edited genres", "etc"],
        }).expect(404);
    })
    it('PATCH without id > 404', () => {
      return request(app.getHttpServer())
        .patch("/movies")
        .send({          
          title: "updateMovie",
          year: 1111,
          genres: ["edited genres", "etc"],
        }).expect(404);
    })
    it('PATCH with sub data(title) > 200', () => {
      return request(app.getHttpServer())
        .patch("/movies/1")
        .send({          
          title: "updateMovie",
        }).expect(200);
    })
    it('PATCH with sub data(year) > 200', () => {
      return request(app.getHttpServer())
        .patch("/movies/1")
        .send({          
          year: 1111,
        }).expect(200);
    })
    it('PATCH with sub data(genres) > 200', () => {
      return request(app.getHttpServer())
        .patch("/movies/1")
        .send({          
          genres: ["edited genres", "etc"],
        }).expect(200);
    })
    it('PATCH with not allowed data > 400', () => {
      return request(app.getHttpServer())
        .patch("/movies/1")
        .send({          
          title: "updateMovie",
          year: 1111,
          genres: ["edited genres", "etc"],
          hack: "hacked"
        }).expect(400);
    })
    // DELETE
    it('DELETE without id > 404', () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404);
    })
    it('DELETE with currect id > 200', () => {
      return request(app.getHttpServer())
        .delete("/movies/1")
        .expect(200);
    })
    it('DELETE with incurrect id > 404', () => {
      return request(app.getHttpServer())
        .delete("/movies/-1")
        .expect(404);
    })
  })
});
