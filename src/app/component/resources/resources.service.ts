
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { IResource } from 'src/app/shared/models/resources';


const jobUrl = baseUrl + 'Resources';
//const userUrl = baseUrl + 'account';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllResources(){
      return this.http.get<IResource[]>(jobUrl);
    }

    getResourceById(id){
      return this.http.get<IResource>(`${jobUrl}/${id}`);
    }

    createResource(data){
      return this.http.post<IResource>(jobUrl, data);
    }

    updateResource(id, data){
      return this.http.put<IResource>(`${jobUrl}/${id}`, data);
    }

    deleteResource(data){
      return this.http.delete(`${jobUrl}/${data.id}`);
    }
}
