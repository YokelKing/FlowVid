import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeCreateComponent } from './type-create/type-create.component';
//import { TypeListComponent } from './type-list/type-list.component';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeEditComponent } from './type-edit/type-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { TypeListComponent } from './type-list/type-list.component';
const routes: Routes = [
  { path: 'type-list', component: TypeListComponent },
  { path: 'type-create', component: TypeCreateComponent },
  { path: 'type-edit/:id', component: TypeEditComponent }
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
    TypeCreateComponent,
    TypeEditComponent,
    TypeListComponent
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
export class TypeModule { }
