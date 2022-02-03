

module.exports = class MovieDto{
    title: string;
    year: number;
    format: string;
    actors: Array<{}>;
    constructor(title: string, year: number, format: string, actors: Array<{}>) {
        this.title = title;
        this.year = year;
        this.format = format;
        this.actors = actors;
    }
}