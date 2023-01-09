import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobtypeCreateComponent } from './jobtype-create/jobtype-create.component';
import { JobtypesListComponent } from './jobtypes-list/jobtypes-list.component';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobtypeEditComponent } from './jobtype-edit/jobtype-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
const routes: Routes = [
  { path: 'jobtypes-list', component: JobtypesListComponent },
  { path: 'jobtype-create', component: JobtypeCreateComponent },
  { path: 'jobtype-edit/:id', component: JobtypeEditComponent }
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
    JobtypeCreateComponent,
    JobtypeEditComponent,
    JobtypesListComponent
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
export class JobtypesModule { }
