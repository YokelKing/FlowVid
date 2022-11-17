import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsCreateComponent } from './jobs-create/jobs-create.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';



@NgModule({
  declarations: [
    JobsCreateComponent,
    JobsListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JobModule { }
