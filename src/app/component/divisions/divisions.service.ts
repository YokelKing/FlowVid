
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { IDivision } from 'src/app/shared/models/divisions';


const divisionUrl = baseUrl + 'Divisions';

@Injectable({
  providedIn: 'root'
})
export class DivisionsService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllDivisions(){
      return this.http.get<IDivision[]>(divisionUrl);
    }

    getDivisionById(id){
      return this.http.get<IDivision>(`${divisionUrl}/${id}`);
    }

    createDivision(data){
      return this.http.post<IDivision>(divisionUrl, data);
    }

    updateDivision(id, data){
      return this.http.put<IDivision>(`${divisionUrl}/${id}`, data);
    }

    deleteDivision(data){
      return this.http.delete(`${divisionUrl}/${data.id}`);
    }
}
