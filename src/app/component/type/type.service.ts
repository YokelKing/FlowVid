
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { IType } from 'src/app/shared/models/type';


const typeUrl = baseUrl + 'JobIssueType';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllTypes(){
      return this.http.get<IType[]>(typeUrl);
    }

    getTypeById(id){
      return this.http.get<IType>(`${typeUrl}/${id}`);
    }

    createType(data){
      return this.http.post<IType>(typeUrl, data);
    }

    updateType(id, data){
      return this.http.put<IType>(`${typeUrl}/${id}`, data);
    }

    deleteType(data){
      return this.http.delete(`${typeUrl}/${data.id}`);
    }
}
