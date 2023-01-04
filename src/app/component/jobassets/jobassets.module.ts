import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobassetCreateComponent } from './jobasset-create/jobasset-create.component';
import { JobassetsListComponent } from './jobassets-list/jobassets-list.component';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobassetEditComponent } from './jobasset-edit/jobasset-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
const routes: Routes = [
  { path: 'jobassets-list', component: JobassetsListComponent },
  { path: 'jobasset-create', component: JobassetCreateComponent },
  { path: 'jobasset-edit/:id', component: JobassetEditComponent }
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
    JobassetCreateComponent,
    JobassetEditComponent,
    JobassetsListComponent
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
export class JobassetsModule { }
