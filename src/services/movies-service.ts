import {MOVIE_EXISTS} from "../global/errors";
import {Movies} from "../model/movies-model";
import {Actors} from "../model/actors-model";
const  ApiError = require("../exeptions/api-error");


export class SessionService{
    async create(title : string, year: number, format: string, actors: Array<string>){
        const isMovieExist : any  = await Movies.findOne({where: {title}});
        if(isMovieExist){
            throw ApiError.BadRequest(`Movie with such title is already exists`, [MOVIE_EXISTS]);
        }


        const movie: any = await Movies.create({title, year, format});
        actors.map(async actor => {
            await Actors.create({name: actor, movieId: movie.id});
        })
        return {message: "Ok"};
    }
}
module.exports = new SessionService();