import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { execPath } from 'process';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  const createTemp = () => {
    service.create({
      title: 'test_movie',
      year: 2000,
      genres: ['test']
    });
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return a movie", () => {
      createTemp();
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })
    it("should throw 404 error", () => {
      try {
        service.getOne(-1);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID -1 not found.");
      }
    })
  })

  describe("deleteOne", () => {
    it("deletes a movie", () => {
      createTemp();
      const beforeDeleteLength = service.getAll().length;
      service.deleteOne(1);
      const afterDeleteLength = service.getAll().length;
      expect(afterDeleteLength).toBeLessThan(beforeDeleteLength);
    })
    it("should throw 404 error", () => {
      try {
        service.deleteOne(-1);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID -1 not found.");
      }
    })
  })

  describe("craete", () => {
    it("create a movie", () => {
      const beforeCreateLength = service.getAll().length;
      createTemp();;
      const afterCreateLength = service.getAll().length;
      expect(afterCreateLength).toBeGreaterThan(beforeCreateLength);
    });
  })

  describe("update", () => {
    const updateTitle = "updateMovie";
    const updateYear = 1111;
    const updateGenres = ["edited genres", "etc"];
    it("chagne all", () => {
      createTemp()
      service.update(1, {
        title: updateTitle,
        year: updateYear,
        genres: updateGenres,
      })
      const result = service.getOne(1);
      expect(result.title).toEqual(updateTitle);
      expect(result.year).toEqual(updateYear);
      expect(result.genres).toEqual(updateGenres);
    })
    it("chagne title", () => {
      createTemp()
      const origin = service.getOne(1);
      service.update(1, {
        title: updateTitle,
      })
      const result = service.getOne(1);
      expect(result.title).toEqual(updateTitle);
      expect(result.year).toEqual(origin.year);
      expect(result.genres).toEqual(origin.genres);
    })
    it("chagne year", () => {
      createTemp()
      const origin = service.getOne(1);
      service.update(1, {
        year: updateYear,
      })
      const result = service.getOne(1);
      expect(result.title).toEqual(origin.title);
      expect(result.year).toEqual(updateYear);
      expect(result.genres).toEqual(origin.genres);
    })
    it("chagne genre", () => {
      createTemp()
      const origin = service.getOne(1);
      service.update(1, {
        genres: updateGenres,
      })
      const result = service.getOne(1);
      expect(result.title).toEqual(origin.title);
      expect(result.year).toEqual(origin.year);
      expect(result.genres).toEqual(updateGenres);
    })
    it("not found exception", () => {
      createTemp()
      try {
        service.update(-1, {
          title: updateTitle,
          year: updateYear,
          genres: updateGenres,
        })
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
