const API_KEY = "add7be86cf435693a66f8d1ca781c767";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE = "ko";
const REGION = "kr";

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

export interface IGetMoviesResult {

    dates: {
        minimum: string;
        maximum: string;
    }
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;

}

export interface IGetMovieVideos {
    id: string,
    results: {
        name: string,
        key: string,
        site: string,
        size: number,
        type: string,
        official: boolean,
        published_at: string,
        id: string,
    }[]
}

export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&region=${REGION}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

export function getMoviesVideos(movieId?:number){
    return fetch(`${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}


export function getSeries(){
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&region=${REGION}&language=${LANGUAGE}`)
        .then((response) => response.json()
    );
}

