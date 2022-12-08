
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { IJob } from 'src/app/shared/models/Jobs';


const jobUrl = baseUrl + 'Jobs';
//const userUrl = baseUrl + 'account';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllJobs(){
      return this.http.get<IJob[]>(jobUrl);
    }

    getJobById(id){
      return this.http.get<IJob>(`${jobUrl}/${id}`);
    }

    createJob(data){
      return this.http.post<IJob>(jobUrl, data);
    }

    updateJob(id, data){
      return this.http.put<IJob>(`${jobUrl}/${id}`, data);
    }

    deleteJob(data){
      return this.http.delete(`${jobUrl}/${data.id}`);
    }
}
