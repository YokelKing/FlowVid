import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserPagesService } from 'src/app/user-pages/user-pages.services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private UserPagesService: UserPagesService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean> | Promise<boolean> | boolean {
        let token;
        
        token = localStorage.getItem('token');
    
        if (token) {
            return true;
          } else {
            this.routeToLoginPage();         
        } 

      }
      routeToLoginPage() {
        // to clear userInfo and login token from store then route to login screen
    
        this.UserPagesService.logout();    

      }
    
}



