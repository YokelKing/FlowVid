import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { HomeComponent } from './shared/home/home.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { CustomersModule } from './component/customers/customers.module';
import { JobsModule } from './component/jobs/jobs.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import { MaterialModule } from './material.module';
import { LoginGuard } from 'src/app/apps/_helpers/login.guard';
import { AuthGuard } from 'src/app/apps/_helpers/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    HomeComponent,
    NavbarComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    CustomersModule,
    JobsModule,
    MatSidenavModule,
    MatTabsModule,
    MaterialModule,
    SharedModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
    })


  ],
  exports: [CustomersModule,JobsModule],
  providers: [ThemeService,AuthGuard,LoginGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }

