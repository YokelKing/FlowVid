import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressCreateComponent } from './progress-create/progress-create.component';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgressEditComponent } from './progress-edit/progress-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { ProgressListComponent } from './progress-list/progress-list.component';
const routes: Routes = [
  { path: 'progress-list', component: ProgressListComponent },
  { path: 'progress-create', component: ProgressCreateComponent },
  { path: 'progress-edit/:id', component: ProgressEditComponent }
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
    ProgressCreateComponent,
    ProgressEditComponent,
    ProgressListComponent
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
export class ProgressModule { }
