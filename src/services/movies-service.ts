import {Movies} from "../model/movies-model";
import {Actors} from "../model/actors-model";
import {Op, Sequelize} from "sequelize";

const ApiError = require("../exeptions/api-error");
const MovieDto = require('../dtos/movie-dto')

function getMovieIdsFromActors(array: Array<Actors>) {
    let idArr: Set<number> = new Set<number>();
    array.map((actor: Actors) => {
        idArr.add(actor.movieId)
    })
    return [...idArr]
}

export class SessionService {
    async create(title: string, year: number, format: string, actors: Array<string>) {
        const isMovieExist: Movies | null = await Movies.findOne({where: {title}});
        if (isMovieExist) {
            throw ApiError.BadRequest("MOVIE_EXISTS", {"title": "NOT_UNIQUE"});

        }

        const movie: Movies = await Movies.create({title, year, format});
        actors.map(async actor => {
            await Actors.create({name: actor, movieId: movie.id});
        })

        const actorsOfFilm = await Actors.findAll({where: {movieId: movie.id}});
        movie.set("actors", actorsOfFilm);

        return {
            data: movie,
            status: 1
        };
    }

    async delete(id: number) {
        const isMovieExist: Movies | null = await Movies.findByPk(id);
        if (!isMovieExist) {
            throw ApiError.BadRequest("MOVIE_NOT_FOUND", {"id": id});
        }

        await Actors.destroy({where: {movieId: isMovieExist.id}});
        await isMovieExist.destroy();

        return {status: 1};
    }

    async update(id: number, title: string, year: number, format: string, actors: Array<string>) {
        const isMovieExist: Movies | null = await Movies.findByPk(id);
        if (!isMovieExist) {
            throw ApiError.BadRequest(`MOVIE_NOT_FOUND`, {"id": id});
        }
        await Movies.update(
            {title, year, format},
            {where: {id: id}}
        );
        await Actors.destroy({where: {movieId: id}});
        actors.map(async actor => {
            await Actors.create({name: actor, movieId: id});
        })

        return this.getMovie(id);
    }


    async getMovie(id: number) {
        const isMovieExist: Movies | null = await Movies.findByPk(id);
        if (!isMovieExist) {
            throw ApiError.BadRequest(`MOVIE_NOT_FOUND`, {"id": id});
        }
        let movie = isMovieExist;

        const actorsOfFilm = await Actors.findAll({where: {movieId: id}});
        movie.set("actors", actorsOfFilm);

        return {
            movie,
            status: 1
        }

    }

    async getMovieList(actor: string, title: string, search: string, sort: string, order: string, limit: number, offset: number) {
        offset = offset || 0;
        limit = limit || 10;
        order = order || "ASC"
        sort = sort || "id";
        offset = offset * limit - limit;
        let movies: { rows: Movies[]; count: number } | Movies[] = [];

        if (actor) {
            let result: Array<Actors> = await Actors.findAll({
                where: {
                    name: {
                        [Op.like]: `%${actor}%`
                    }
                }
            })
            let idArr = getMovieIdsFromActors(result)
            if (idArr.length > 0){
                movies = await Movies.findAll({
                    attributes: {exclude: ['actors']},
                    where: {id: {[Op.or]: idArr}},
                    order: [
                        [Sequelize.fn('lower', Sequelize.col(`${sort}`)), `${order}`],
                    ],
                    limit,
                    offset
                })
            }
            return {
                movies: {
                    "count": 0,
                    "rows": []},
                status: 1
            }

        } else if (title) {
            movies = await Movies.findAndCountAll(
                {
                    attributes: {exclude: ['actors']},
                    where: {
                        title: {
                            [Op.like]: `%${title}%`
                        }
                    },
                    order: [
                        [Sequelize.fn('lower', Sequelize.col(`${sort}`)), `${order}`],
                    ],
                    limit,
                    offset
                })
        } else if (search) {
            let moviesSearch = await Movies.findAndCountAll(
                {
                    attributes: {exclude: ['actors']},
                    where: {
                        title: {
                            [Op.like]: `%${search}%`
                        },
                    },
                })
            let actorsSearch: { rows: Movies[]; count: number } = await Movies.findAndCountAll(
                {
                    attributes: {exclude: ['actors']},
                    include: {
                        model: Actors,
                        where: {
                            name: {
                                [Op.like]: `%${search}%`
                            },
                        },
                    }
                })
            let foundedIdOfMovies: Set<number> = new Set<number>();
            moviesSearch.rows.map((movie: Movies) => {
                foundedIdOfMovies.add(movie.id)
            })
            actorsSearch.rows.map((movie: Movies) => {
                foundedIdOfMovies.add(movie.id)
            })
            let resultIds = [...foundedIdOfMovies];
            if(resultIds.length > 0){
                movies = await Movies.findAndCountAll({
                    attributes: {exclude: ['actors']},
                    where: {id: {[Op.or]: resultIds}},
                    order: [
                        [Sequelize.fn('lower', Sequelize.col(`${sort}`)), `${order}`],
                    ],
                    limit,
                    offset
                });
            }
            return {
                movies: {
                    "count": 0,
                    "rows": []},
                status: 1
            }

        } else {
            movies = await Movies.findAndCountAll({
                attributes: {exclude: ['actors']},
                order: [
                    [Sequelize.fn('lower', Sequelize.col(`${sort}`)), `${order}`],
                ],
                limit,
                offset
            });
        }

        return {
            movies,
            status: 1
        }

    }


    async import(file: any) {
        let currentData = file.toString().split(/(?:\r\n|\r|\n)/g);
        let movieList: Movies[] = [];
        let values: string[] = [];

        for (let i = 0; i < currentData.length; i++) {
            if (currentData[i] == '' || currentData[i] == '\n') {
                movieList.push(new MovieDto(...values));
                values.length = 0;
                if (currentData[i + 1] == '' || currentData[i] == '\n') {
                    break;
                }
                continue;
            }
            let line = currentData[i].split(':');
            values.push(line[1].trim());
        }

        const dataToOutput: Movies[] = []
        await Promise.all(movieList.map( async (movieItem: Movies) => {
            const isMovieExist: Movies | null = await Movies.findOne({where: {title: movieItem.title}});
            if (!isMovieExist) {
                const movie: Movies = await Movies.create({
                    title: movieItem.title,
                    year: movieItem.year,
                    format: movieItem.format
                });
                dataToOutput.push(movie);
                movieItem.actors.split(',').map(async (actor: string) => {
                    await Actors.create({name: actor.trim(), movieId: movie.id});
                })
            }
        }))
        const amount = await Movies.findAndCountAll();

        return {
            data: dataToOutput,
            meta: {
                imported: dataToOutput.length,
                total: amount.count
            },
            status: 1
        }
    }
}

module.exports = new SessionService();