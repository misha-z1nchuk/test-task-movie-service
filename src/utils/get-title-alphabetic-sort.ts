import {Movies} from "../model/movies-model";


export async function getTitleAlphabeticSort(movies : Movies[], order: string){
    if (order == 'ASC'){
        movies.sort(function(a, b) {
            var keyA = a.title.toLowerCase(),
                keyB = b.title.toLowerCase();
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
    } else {
        movies.sort(function(a, b) {
            var keyA = a.title.toLowerCase(),
                keyB = b.title.toLowerCase();
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });
    }
    return movies;



}