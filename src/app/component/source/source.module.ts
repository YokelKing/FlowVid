import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourceCreateComponent } from './source-create/source-create.component';
import { SourceListComponent } from './source-list/source-list.component';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceEditComponent } from './source-edit/source-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
const routes: Routes = [
  { path: 'source-list', component: SourceListComponent },
  { path: 'source-create', component: SourceCreateComponent },
  { path: 'source-edit/:id', component: SourceEditComponent }
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
    SourceCreateComponent,
    SourceEditComponent,
    SourceListComponent
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
export class SourceModule { }
