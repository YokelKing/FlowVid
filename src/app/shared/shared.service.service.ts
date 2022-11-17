import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl } from '../apps/guards/api.url';
import { IMenu } from './models/menu';


const menuUrl = baseUrl + 'menu/'
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor(private http: HttpClient,
    private router: Router) { }

    getMenus(){
      return this.http.get<IMenu[]>(menuUrl);
    }

    getMenuById(id){
      return this.http.get<IMenu>(`${menuUrl}/${id}`
      );
    }

    createMenu(data){
      return this.http.post<IMenu>(menuUrl, data);
    }

    updateMenu(id, data){
      return this.http.put<IMenu>(`${menuUrl}/${id}`, data);
    }

    deleteMenu(data){
      return this.http.delete(`${menuUrl}/${data.id}`);
    }
}
