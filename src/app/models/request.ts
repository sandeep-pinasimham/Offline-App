import { Actor } from "./actor";

export interface Request{
    actors:Actor[];
    directorName:string;
    episodeDescription:string;
    episodeNumber:number;
    genre:string;
    language:string;
    producerName:string;
    rating:number;
    requestId:number;
    seriesName:string;
    seriesReleaseYear:number;
    status:string;

}

