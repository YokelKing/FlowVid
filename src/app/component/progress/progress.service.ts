
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { IProgress } from 'src/app/shared/models/progress';


const progressUrl = baseUrl + 'JobProgressStatus';
@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllProgresss(){
      return this.http.get<IProgress[]>(progressUrl);
    }

    getProgressById(id){
      return this.http.get<IProgress>(`${progressUrl}/${id}`);
    }

    createProgress(data){
      return this.http.post<IProgress>(progressUrl, data);
    }

    updateProgress(id, data){
      return this.http.put<IProgress>(`${progressUrl}/${id}`, data);
    }

    deleteProgress(data){
      return this.http.delete(`${progressUrl}/${data.id}`);
    }
}
