import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
const routes: Routes = [
  { path: 'teams-list', component: TeamsListComponent },
  { path: 'team-create', component: TeamCreateComponent },
  { path: 'team-edit/:id', component: TeamEditComponent }
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
    TeamCreateComponent,
    TeamEditComponent,
    TeamsListComponent
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
export class TeamsModule { }
