import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard/dashboard.page';
import {HomePage } from './dashboardComponents/home/home.page'
import {MessagesPage } from './dashboardComponents/messages/messages.page'
import {PaymentsPage } from './dashboardComponents/payments/payments.page'
import {PostedJPage } from './dashboardComponents/posted-j/posted-j.page'
import {ProfileEditPage } from './dashboardComponents/profile-edit/profile-edit.page'
import { ProfilePage} from './dashboardComponents/profile/profile.page'
import {PostPage } from './dashboardComponents/post/post.page'
import { ApplicantsPage} from './dashboardComponents/applicants/applicants.page'
import {SettingsPage} from './dashboardComponents/settings/settings.page'
import {JobCenterPage} from './dashboardComponents/job-center/job-center.page'
import { PasswordResetPage } from './password-reset/password-reset.page'
import { JobCompletedPage } from './dashboardComponents/job-completed/job-completed.page'
import { AppliedJobsPage} from './dashboardComponents/applied-jobs/applied-jobs.page'
import {EmailChangePage} from './dashboardComponents/email-change/email-change.page'
import {NumberChangePage} from './dashboardComponents/number-change/number-change.page'
import {PasswordChangePage} from './dashboardComponents/password-change/password-change.page'
import {ReviewPage} from './dashboardComponents/review/review.page'
import { AuthGuard } from './auth.guard'
const routes: Routes = [
  { path: '', redirectTo: 'dashboard/home', pathMatch: 'full' }/*,
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'password-reset', component:PasswordResetPage, pathMatch:'full' },
  { path:'dashboard', redirectTo:'dashboard/home', pathMatch:'full'},
  { path:'dashboard', component: DashboardPage,//canActivate: [AuthGuard],
  children: [
    { path: 'messages', component:MessagesPage , pathMatch:'full'},
  { path: 'home', component: HomePage , pathMatch:'full'},
  { path: 'payments', component:PaymentsPage , pathMatch:'full'},
  { path: 'post', component:PostPage ,pathMatch:'full'},
  { path: 'settings', component: SettingsPage, pathMatch:'full' },
  { path: 'profile-edit', component: ProfileEditPage, pathMatch:'full' },
  {path:'posted', component:PostedJPage,pathMatch:'full'},
  {path:'review', component:ReviewPage,pathMatch:'full'},
  {path:'job-completed', component:JobCompletedPage, pathMatch:'full' },
  {path:'applied-jobs',component:AppliedJobsPage,pathMatch:"full"},
   { path: 'job-center', component: JobCenterPage,
    children:[
      {path:'posted', component:PostedJPage,pathMatch:'full'},
      {path:'job-completed', component:JobCompletedPage, pathMatch:'full' },
      {path:'dashboard/job-center/applied-jobs',component:AppliedJobsPage,pathMatch:"full"},
     { path: 'applicants', component:ApplicantsPage, pathMatch:"full" }
   ]},
    { path: 'profile', component: ProfilePage, pathMatch:"full" },
   { path: 'applicants', component:ApplicantsPage, pathMatch:"full" },
    { path: 'passwordchange', component:PasswordChangePage, pathMatch:"full" },
    { path: 'emailchange', component:EmailChangePage, pathMatch:"full" },
    { path: 'numberchange', component:NumberChangePage, pathMatch:"full" },
      { path: 'verify', loadChildren: './dashboardComponents/verify/verify.module#VerifyPageModule' }

  ]
},
  { path: 'password-change', loadChildren: './dashboardComponents/password-change/password-change.module#PasswordChangePageModule' },
  { path: 'number-change', loadChildren: './dashboardComponents/number-change/number-change.module#NumberChangePageModule' },
  { path: 'email-change', loadChildren: './dashboardComponents/email-change/email-change.module#EmailChangePageModule' }, */

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
  NumberChangePage,
  EmailChangePage,
  PasswordChangePage,
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
  JobCenterPage,
  ProfilePage,
  ApplicantsPage,
  ReviewPage
];
