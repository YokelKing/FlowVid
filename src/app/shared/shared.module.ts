import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextInputComponent } from './text-input/text-input.component';


const routes: Routes = [
  { path: 'nav', component: NavbarComponent },

]
@NgModule({
  declarations: [
    TextInputComponent,
    NavMenuComponent,
    SidebarComponent    
   ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
  exports: [NavMenuComponent,SidebarComponent]
})
export class SharedModule {
  
 }
