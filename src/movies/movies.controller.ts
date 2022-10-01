import { Controller, Get, Param, Post, Delete, Put, Patch, Body, Query, NotFoundException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { NotFoundError } from 'rxjs';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll()
    }

    @Get("/search")
    search(@Query("year") searchingYear: number) {
        return `We are searching for a movie made after: ${searchingYear}`;
    }

    @Get("/:id")
    getOne(@Param('id') id: number): Movie {
        const movie = this.moviesService.getOne(id);
        if (!movie) {
            throw new NotFoundException(`Movie with Id ${id} not fouud.`);
        }
        return movie;
    }

    @Post()
    create(@Body() movieData: CreateMovieDTO) {
        this.moviesService.create(movieData);
    }

    @Put()
    update(@Body() updateData) {
        return {
            mode: "create",
            ...updateData,
        };
    }

    @Delete("/:id")
    deleteOne(@Param('id') id: number): boolean {
        return this.moviesService.deleteOne(id);
    }

    @Patch("/:id")
    patch(@Param('id') id: number, @Body() updateData: UpdateMovieDTO) {
        return this.moviesService.update(id, updateData);
    }
}
