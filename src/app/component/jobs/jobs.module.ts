import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule, NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { JobCreateEditComponent } from './job-create-edit/job-create-edit.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TaskCreateEditComponent } from './task-create-edit/task-create-edit.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
  { path: 'jobs-list', component: JobsListComponent },
  { path: 'job-create', component: JobCreateEditComponent },
  { path: 'job-edit/:id', component: JobCreateEditComponent }
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
    JobEditComponent,
    JobsListComponent,
    JobCreateEditComponent,
    TaskCreateEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
    MatIconModule,
    AgGridModule,

    RouterModule.forChild(routes),
    ...materialModules

  ],
  exports: [ReactiveFormsModule,...materialModules],
  providers: [
    NgbActiveModal,
  ]
})
export class JobsModule { }
