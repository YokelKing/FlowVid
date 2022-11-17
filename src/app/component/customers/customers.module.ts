import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomersListComponent } from './customers-list/customers-list/customers-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create/customer-create.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'cust-list', component: CustomersListComponent },
  { path: 'cust-create', component: CustomerCreateComponent },
  { path: 'cust-create/:id', component: CustomerCreateComponent }
]


@NgModule({
  declarations: [
    CustomersListComponent,
    CustomerCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
    
  ]
})
export class CustomersModule { }
