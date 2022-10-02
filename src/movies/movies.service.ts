import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];
    private _id: number = 0;

    create(MovieData: CreateMovieDTO) {
        this.movies.push({
            id: this._id + 1,
            ...MovieData
        });
        this._id += 1;
    }
    getAll(): Movie[] {
        return this.movies;
    }
    getOne(id: number): Movie {
        const result = this.movies.find(movie => movie.id === id);
        if (!result) throw new NotFoundException(`Movie with ID ${id} not found.`)

        return result;
    }
    deleteOne(id: number): boolean {
        const afterMovies = this.movies.filter(movie => movie.id !== id);
        if (afterMovies.length === this.movies.length) throw new NotFoundException(`Movie with ID ${id} not found.`);

        this.movies = afterMovies;
        return true;
    }    
    update(id: number, updateData: UpdateMovieDTO) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
    }
}
