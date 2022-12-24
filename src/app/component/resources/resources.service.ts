
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { IResource } from 'src/app/shared/models/resources';


const resourceUrl = baseUrl + 'Resources';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllResources(){
      return this.http.get<IResource[]>(resourceUrl);
    }

    getResourceById(id){
      return this.http.get<IResource>(`${resourceUrl}/${id}`);
    }

    createResource(data){
      return this.http.post<IResource>(resourceUrl, data);
    }

    updateResource(id, data){
      return this.http.put<IResource>(`${resourceUrl}/${id}`, data);
    }

    deleteResource(data){
      return this.http.delete(`${resourceUrl}/${data.id}`);
    }
}
