import { Injectable } from '@nestjs/common';
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
        return this.movies.find(movie => movie.id === id);
    }
    deleteOne(id: number): boolean {
        this.movies = this.movies.filter(movie => movie.id !== id);
        return true;
    }    
    update(id: number, updateData: UpdateMovieDTO) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
    }
}
