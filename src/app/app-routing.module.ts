import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './shared/home/home.component';



const routes: Routes = [  
  // { path: '**', redirectTo:'', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent },  
  // { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  // { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  // { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  // { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'user-pages', loadChildren: () => 
  import('./user-pages/user-pages.module').
  then(m => m.UserPagesModule) },
  { path: 'customers', loadChildren: () => 
  import('./component/customers/customers.module').
  then(m => m.CustomersModule) },
  { path: 'jobs', loadChildren: () => 
  import('./component/jobs/jobs.module').
  then(m => m.JobsModule) },
  { path: 'resources', loadChildren: () => 
  import('./component/resources/resources.module').
  then(m => m.ResourcesModule) },
  { path: 'teams', loadChildren: () => 
  import('./component/teams/teams.module').
  then(m => m.TeamsModule) },

  { path: 'teamresources', loadChildren: () => 
  import('./component/teamresources/teamresources.module').
  then(m => m.TeamresourcesModule) },


  { path: 'posts', loadChildren: () => 
  import('./component/posts/posts.module').
  then(m => m.PostsModule) },

  { path: 'divisions', loadChildren: () => 
  import('./component/divisions/divisions.module').
  then(m => m.DivisionsModule) },
  { path: 'locations', loadChildren: () => 
  import('./component/locations/locations.module').
  then(m => m.LocationsModule) },


  { path: 'type', loadChildren: () => 
  import('./component/type/type.module').
  then(m => m.TypeModule) },

  { path: 'source', loadChildren: () => 
  import('./component/source/source.module').
  then(m => m.SourceModule) },

  { path: 'priority', loadChildren: () => 
  import('./component/priority/priority.module').
  then(m => m.PriorityModule) },

  { path: 'progress', loadChildren: () => 
  import('./component/progress/progress.module').
  then(m => m.ProgressModule) },

  { path: 'jobassets', loadChildren: () => 
  import('./component/jobassets/jobassets.module').
  then(m => m.JobassetsModule) },

  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  { path: '**', redirectTo:'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
