
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { ITeamresource } from 'src/app/shared/models/teamresources';


const teamresourceUrl = baseUrl + 'TeamResource';

@Injectable({
  providedIn: 'root'
})
export class TeamresourcesService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllTeamresources(){
      return this.http.get<ITeamresource[]>(teamresourceUrl);
    }

    getTeamresourceById(id){
      return this.http.get<ITeamresource>(`${teamresourceUrl}/${id}`);
    }

    createTeamresource(data){
      return this.http.post<ITeamresource>(teamresourceUrl, data);
    }

    updateTeamresource(id, data){
      return this.http.put<ITeamresource>(`${teamresourceUrl}/${id}`, data);
    }

    deleteTeamresource(data){
      return this.http.delete(`${teamresourceUrl}/${data.id}`);
    }
}
