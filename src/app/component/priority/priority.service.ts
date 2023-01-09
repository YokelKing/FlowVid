
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { IPriority } from 'src/app/shared/models/priority';


const priorityUrl = baseUrl + 'JobPriority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllPriority(){
      return this.http.get<IPriority[]>(priorityUrl);
    }

    getPriorityById(id){
      return this.http.get<IPriority>(`${priorityUrl}/${id}`);
    }

    createPriority(data){
      return this.http.post<IPriority>(priorityUrl, data);
    }

    updatePriority(id, data){
      return this.http.put<IPriority>(`${priorityUrl}/${id}`, data);
    }

    deletePriority(data){
      return this.http.delete(`${priorityUrl}/${data.id}`);
    }
}
