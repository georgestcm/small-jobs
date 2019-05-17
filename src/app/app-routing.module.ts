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
import { PasswordResetPage } from './dashboardComponents/password-reset/password-reset.page'
import { JobCompletedPage } from './dashboardComponents/job-completed/job-completed.page'
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path:'dashboard', redirectTo:'dashboard/home', pathMatch: 'full' },
  { path:'dashboard', component: DashboardPage,
  children: [
    { path: 'messages', component:MessagesPage , pathMatch:'full'},
  { path: 'home', component: HomePage , pathMatch:'full'},
  { path: 'payments', component:PaymentsPage , pathMatch:'full'},
  { path: 'posted', component:PostedJPage , pathMatch:'full'},
  { path: 'post', component:PostPage , pathMatch:'full'},
  { path: 'settings', component: SettingsPage, pathMatch:'full' },
  { path: 'profile-edit', component: ProfileEditPage, pathMatch:'full' },
  { path: 'job-completed', component: JobCompletedPage, pathMatch:'full' }
  ]
},
{ path: 'password-reset', component:PasswordResetPage, pathMatch:'full' }
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
  JobCompletedPage
];
