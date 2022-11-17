import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextInputComponent } from './text-input/text-input.component';


const routes: Routes = [
  { path: 'nav', component: NavbarComponent },
  { path: 'sidebar', component: SidebarComponent }
]
@NgModule({
  declarations: [
    TextInputComponent,
   ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ]
})
export class SharedModule { }
