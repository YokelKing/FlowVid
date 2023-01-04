import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCreateComponent } from './location-create/location-create.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { RouterModule, Routes } from '@angular/router';


import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
const routes: Routes = [
  { path: 'locations-list', component: LocationsListComponent },
  { path: 'location-create', component: LocationCreateComponent },
  { path: 'location-edit/:id', component: LocationEditComponent }
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
    LocationCreateComponent,
    LocationEditComponent,
    LocationsListComponent
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
export class LocationsModule { }
