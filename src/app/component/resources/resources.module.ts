import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceCreateComponent } from './resource-create/resource-create.component';
import { ResourcesListComponent } from './resources-list/resources-list.component';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceEditComponent } from './resource-edit/resource-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
const routes: Routes = [
  { path: 'resources-list', component: ResourcesListComponent },
  { path: 'resource-create', component: ResourceCreateComponent },
  { path: 'resource-edit/:id', component: ResourceEditComponent }
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
    ResourceCreateComponent,
    ResourceEditComponent,
    ResourcesListComponent
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
export class ResourcesModule { }
