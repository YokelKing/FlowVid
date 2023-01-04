import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamresourceCreateComponent } from './teamresource-create/teamresource-create.component';
import { TeamresourcesListComponent } from './teamresources-list/teamresources-list.component';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamresourceEditComponent } from './teamresource-edit/teamresource-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
const routes: Routes = [
  { path: 'teamresources-list', component: TeamresourcesListComponent },
  { path: 'teamresource-create', component: TeamresourceCreateComponent },
  { path: 'teamresource-edit/:id', component: TeamresourceEditComponent }
]
const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule
];
@NgModule({
  declarations: [
    TeamresourceCreateComponent,
    TeamresourceEditComponent,
    TeamresourcesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ...materialModules

  ],
  exports: [ReactiveFormsModule,...materialModules],
  providers: [
    NgbActiveModal,
  ]
})
export class TeamresourcesModule { }
