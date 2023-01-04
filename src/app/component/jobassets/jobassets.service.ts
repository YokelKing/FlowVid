
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { IJobasset } from 'src/app/shared/models/jobassets';


const jobassetUrl = baseUrl + 'Jobasset';
@Injectable({
  providedIn: 'root'
})
export class JobassetsService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllJobassets(){
      return this.http.get<IJobasset[]>(jobassetUrl);
    }

    getJobassetById(id){
      return this.http.get<IJobasset>(`${jobassetUrl}/${id}`);
    }

    createJobasset(data){
      return this.http.post<IJobasset>(jobassetUrl, data);
    }

    updateJobasset(id, data){
      return this.http.put<IJobasset>(`${jobassetUrl}/${id}`, data);
    }

    deleteJobasset(data){
      return this.http.delete(`${jobassetUrl}/${data.id}`);
    }
}
