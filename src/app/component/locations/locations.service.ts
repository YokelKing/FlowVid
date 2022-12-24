
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { ILocation } from 'src/app/shared/models/locations';


const locationUrl = baseUrl + 'SiteLocations';
@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllLocations(){
      return this.http.get<ILocation[]>(locationUrl);
    }

    getLocationById(id){
      return this.http.get<ILocation>(`${locationUrl}/${id}`);
    }

    createLocation(data){
      return this.http.post<ILocation>(locationUrl, data);
    }

    updateLocation(id, data){
      return this.http.put<ILocation>(`${locationUrl}/${id}`, data);
    }

    deleteLocation(data){
      return this.http.delete(`${locationUrl}/${data.id}`);
    }
}
