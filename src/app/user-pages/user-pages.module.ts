import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UsersComponent } from "./users-list/users.component";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RolesComponent } from "./roles/roles.component";
import { BasicElementsComponent } from "./basic-elements/basic-elements.component";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { RolesCreateComponent } from "./roles/roles-create/roles-create.component";
import { SharedModule } from "../shared/shared.module";

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

const routes: Routes = [
  { path: "", component: UsersComponent },
  { path: "basic-elements", component: BasicElementsComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "users-list", component: UsersComponent },
  { path: "roles", component: RolesComponent },
  // { path: 'role-create', component: RolesCreateComponent },
  { path: "role-create/:id", component: RolesCreateComponent },
];

const materialModules = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [
    LoginComponent,
    BasicElementsComponent,
    RegisterComponent,
    RolesComponent,
    UsersComponent,
    RolesCreateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: "danger",
      focusButton: " confirm",
    }),
    ...materialModules,
  ],
  exports: [UsersComponent, LoginComponent, RolesComponent, ...materialModules],
})
export class UserPagesModule {}
