
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { ITeam } from 'src/app/shared/models/teams';


const teamUrl = baseUrl + 'Team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllTeams(){
      return this.http.get<ITeam[]>(teamUrl);
    }

    getTeamById(id){
      return this.http.get<ITeam>(`${teamUrl}/${id}`);
    }

    createTeam(data){
      return this.http.post<ITeam>(teamUrl, data);
    }

    updateTeam(id, data){
      return this.http.put<ITeam>(`${teamUrl}/${id}`, data);
    }

    deleteTeam(data){
      return this.http.delete(`${teamUrl}/${data.id}`);
    }
}
