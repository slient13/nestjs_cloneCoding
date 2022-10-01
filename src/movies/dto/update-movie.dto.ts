import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsNumber, IsOptional } from "class-validator";
import { CreateMovieDTO } from "./create-movie.dto";

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {
}