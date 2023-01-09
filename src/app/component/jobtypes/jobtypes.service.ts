
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { IJobtype } from 'src/app/shared/models/jobtypes';


const jobtypeUrl = baseUrl + 'JobType';

@Injectable({
  providedIn: 'root'
})
export class JobtypesService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllJobtypes(){
      return this.http.get<IJobtype[]>(jobtypeUrl);
    }

    getJobtypeById(id){
      return this.http.get<IJobtype>(`${jobtypeUrl}/${id}`);
    }

    createJobtype(data){
      return this.http.post<IJobtype>(jobtypeUrl, data);
    }

    updateJobtype(id, data){
      return this.http.put<IJobtype>(`${jobtypeUrl}/${id}`, data);
    }

    deleteJobtype(data){
      return this.http.delete(`${jobtypeUrl}/${data.id}`);
    }
}
