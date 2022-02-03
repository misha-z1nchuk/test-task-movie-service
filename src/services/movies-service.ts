import {MOVIE_EXISTS, MOVIE_NOT_EXIST} from "../global/errors";
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
            console.log(movie.id);
            await Actors.create({name: actor, movieId: movie.id});
        })

        const actorsOfFilm = await Actors.findAll({where: {movieId: movie.id}});
        movie.set("actors", actorsOfFilm);

        return {
            movie,
            status: 1
        };
    }

    async delete(id: number) {
        const isMovieExist : any  = await Movies.findByPk(id);
        if(!isMovieExist){
            throw ApiError.BadRequest(`Movie does not  exists`, [MOVIE_NOT_EXIST]);
        }

        await Actors.destroy({where: {movieId: isMovieExist.id}});
        await isMovieExist.destroy();

        return {status: 1};
    }
}
module.exports = new SessionService();