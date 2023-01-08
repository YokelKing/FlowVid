import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { baseUrl } from '../apps/guards/api.url';
import { IUser } from '../shared/models/user';
import { map } from 'rxjs/operators';
import { IRole } from '../shared/models/role';

const usersUrl = baseUrl + 'account/users';
const currentUserUrl = baseUrl + 'account/currentuser' 
const userUrl = baseUrl + 'account';
const roleUrl = baseUrl + 'role'


  @Injectable({
    providedIn: 'root'
  })

  export class UserPagesService {
  // const baseUrl = environment.apiUrl;
    private baseUrl= environment.apiUrl;

    private currentUserSource = new ReplaySubject<IUser>(1);
    currentUser$ = this.currentUserSource.asObservable();
    constructor(private http: HttpClient,
      private router: Router) { }  
      loadCurrentUser(token : string){
        if(token === null){
          this.currentUserSource.next(null);
          return of(null);
        }
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
  
        return this.http.get(this.baseUrl + 'account', {headers}).pipe(
          map((user: IUser) => {
            if(user){
              localStorage.setItem('token', user.token);
              this.currentUserSource.next(user);
            }
          })
        );
      }
      loadAllUser(){
        return this.http.get<IUser[]>(usersUrl);
    
    }


    

      getCurrentUser(){
        return this.http.get<IUser>(currentUserUrl);
      }

      login(values: any){      
        return this.http.post(this.baseUrl +'account/login' ,
         values)
        .pipe(map((user: IUser) => {
          if(user != null){
            localStorage.setItem('token', user.token);
            this.currentUserSource.next(user);
          }
    
        })
        );
      }
      logout() {
        localStorage.removeItem('token');
        this.currentUserSource.next(null);
        this.router.navigateByUrl('/home');
      }

      // Role Services

      getRoles(){
        return this.http.get<IRole[]>(roleUrl)
      }

      getRoleById(id){
        return this.http.get<IRole>(`${roleUrl}/${id}`
        );
      }
  
      createRole(data){
        return this.http.post<IRole>(roleUrl, data);
      }
  
      updateRole(id, data){
        return this.http.put<IRole>(`${roleUrl}/${id}`, data);
      }

      deleteRole(data){
        return this.http.delete<IRole>(`${roleUrl}/${data.id}`)
      }
  }