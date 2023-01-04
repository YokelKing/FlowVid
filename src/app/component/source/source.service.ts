
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { ISource } from 'src/app/shared/models/source';


const sourceUrl = baseUrl + 'JobSource';

@Injectable({
  providedIn: 'root'
})
export class SourceService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllSource(){
      return this.http.get<ISource[]>(sourceUrl);
    }

    getSourceById(id){
      return this.http.get<ISource>(`${sourceUrl}/${id}`);
    }

    createSource(data){
      return this.http.post<ISource>(sourceUrl, data);
    }

    updateSource(id, data){
      return this.http.put<ISource>(`${sourceUrl}/${id}`, data);
    }

    deleteSource(data){
      return this.http.delete(`${sourceUrl}/${data.id}`);
    }
}
