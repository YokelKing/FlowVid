
import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";


export const baseUrl = environment.apiUrl;

export function HTTP_OPTIONS(token: string){
    return new HttpHeaders( {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + token
    }) 

}