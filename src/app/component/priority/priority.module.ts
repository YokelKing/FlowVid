import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriorityCreateComponent } from './priority-create/priority-create.component';
//import { PriorityListComponent } from './priority-list/priority-list.component';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PriorityEditComponent } from './priority-edit/priority-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { PriorityListComponent } from './priority-list/priority-list.component';
const routes: Routes = [
  { path: 'priority-list', component: PriorityListComponent },
  { path: 'priority-create', component: PriorityCreateComponent },
  { path: 'priority-edit/:id', component: PriorityEditComponent }
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
    PriorityCreateComponent,
    PriorityEditComponent,
    PriorityListComponent
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
export class PriorityModule { }
