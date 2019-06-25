import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard/dashboard.page';
import {HomePage } from './dashboardComponents/home/home.page'
import {MessagesPage } from './dashboardComponents/messages/messages.page'
import {PaymentsPage } from './dashboardComponents/payments/payments.page'
import {PostedJPage } from './dashboardComponents/posted-j/posted-j.page'
import {ProfileEditPage } from './dashboardComponents/profile-edit/profile-edit.page'
import {PostPage } from './dashboardComponents/post/post.page'
import {SettingsPage} from './dashboardComponents/settings/settings.page'
import {JobCenterPage} from './dashboardComponents/job-center/job-center.page'
import { PasswordResetPage } from './password-reset/password-reset.page'
import { JobCompletedPage } from './dashboardComponents/job-completed/job-completed.page'
import { AppliedJobsPage} from './dashboardComponents/applied-jobs/applied-jobs.page'
import { AuthGuard } from './auth.guard'
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'password-reset', component:PasswordResetPage, pathMatch:'full' },
  { path:'dashboard', redirectTo:'dashboard/home', pathMatch:'full'},
  { path:'dashboard', component: DashboardPage,canActivate: [AuthGuard],
  children: [
    { path: 'messages', component:MessagesPage , pathMatch:'full'},
  { path: 'home', component: HomePage , pathMatch:'full'},
  { path: 'payments', component:PaymentsPage , pathMatch:'full'},
  { path: 'post', component:PostPage ,pathMatch:'full'},
  { path: 'settings', component: SettingsPage, pathMatch:'full' },
  { path: 'profile-edit', component: ProfileEditPage, pathMatch:'full' },
  {path:'posted', component:PostedJPage,pathMatch:'full'},
  {path:'job-completed', component:JobCompletedPage, pathMatch:'full' },
  {path:'applied-jobs',component:AppliedJobsPage,pathMatch:"full"},
    { path: 'job-center', component: JobCenterPage, pathMatch:"full" }
  ]
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const components = [
  HomePage,
  MessagesPage,
  PaymentsPage,
  PostedJPage,
  ProfileEditPage,
  DashboardPage,
  PostPage,
  SettingsPage,
  PasswordResetPage,
  JobCompletedPage,
  AppliedJobsPage,
  JobCenterPage
];
