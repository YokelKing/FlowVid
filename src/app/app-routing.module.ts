import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './shared/home/home.component';
import { AuthGuard } from 'src/app/apps/_helpers/auth.guard';

import { LoginGuard } from 'src/app/apps/_helpers/login.guard';
const routes: Routes = [

  { path: 'home', canActivate: [LoginGuard], component: HomeComponent },
  // { path: 'user-pages/login', canActivate: [LoginGuard], component: LoginComponent },
  
  // { path: 'user-pages/register', canActivate: [LoginGuard], component: LoginComponent },



  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  {
    path: 'user-pages', canActivate: [LoginGuard],  loadChildren: () =>
      import('./user-pages/user-pages.module').
        then(m => m.UserPagesModule)
  },
  {
    path: 'customers', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/customers/customers.module').
        then(m => m.CustomersModule)
     
  },
  {
    path: 'jobs', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/jobs/jobs.module').
        then(m => m.JobsModule)
  },
  {
    path: 'resources', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/resources/resources.module').
        then(m => m.ResourcesModule)
  },
  {
    path: 'teams', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/teams/teams.module').
        then(m => m.TeamsModule)
  },

  {
    path: 'teamresources', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/teamresources/teamresources.module').
        then(m => m.TeamresourcesModule)
  },


  {
    path: 'posts', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/posts/posts.module').
        then(m => m.PostsModule)
  },

  {
    path: 'divisions', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/divisions/divisions.module').
        then(m => m.DivisionsModule)
  },
  {
    path: 'locations', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/locations/locations.module').
        then(m => m.LocationsModule)
  },


  {
    path: 'type', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/type/type.module').
        then(m => m.TypeModule)
  },

  {
    path: 'source', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/source/source.module').
        then(m => m.SourceModule)
  },

  {
    path: 'priority', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/priority/priority.module').
        then(m => m.PriorityModule)
  },

  {
    path: 'progress', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/progress/progress.module').
        then(m => m.ProgressModule)
  },

  {
    path: 'jobassets', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/jobassets/jobassets.module').
        then(m => m.JobassetsModule)
  },

  {
    path: 'jobtypes', canActivate: [AuthGuard], loadChildren: () =>
      import('./component/jobtypes/jobtypes.module').
        then(m => m.JobtypesModule)
  },

  { path: 'error-pages', canActivate: [AuthGuard], loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  { path: '', redirectTo: 'user-pages/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'user-pages/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
