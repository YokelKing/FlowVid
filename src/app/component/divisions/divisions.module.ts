import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionCreateComponent } from './division-create/division-create.component';
import { DivisionsListComponent } from './divisions-list/divisions-list.component';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DivisionEditComponent } from './division-edit/division-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
const routes: Routes = [
  { path: 'divisions-list', component: DivisionsListComponent },
  { path: 'division-create', component: DivisionCreateComponent },
  { path: 'division-edit/:id', component: DivisionEditComponent }
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
    DivisionCreateComponent,
    DivisionEditComponent,
    DivisionsListComponent
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
export class DivisionsModule { }
