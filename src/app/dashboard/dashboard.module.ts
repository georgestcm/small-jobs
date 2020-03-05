import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {DashboardPage} from './dashboard.page';
import {HomePage } from 'src/app/dashboardComponents/home/home.page';
import {JobCenterPage} from 'src/app/dashboardComponents/job-center/job-center.page';
import {SettingsPage} from 'src/app/dashboardComponents/settings/settings.page';
import {ProfileEditPage } from 'src/app/dashboardComponents/profile-edit/profile-edit.page';
import {PostedJPage } from 'src/app/dashboardComponents/posted-j/posted-j.page';
import { AppliedJobsPage} from 'src/app/dashboardComponents/applied-jobs/applied-jobs.page';
import { JobCompletedPage } from 'src/app/dashboardComponents/job-completed/job-completed.page';
import { ApplicantsPage} from 'src/app/dashboardComponents/applicants/applicants.page'
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardPage,
    children: [
      {
        path: "home",
        component: HomePage
      },
      {
        path: "job-center",
        component: JobCenterPage,
        children:[
          {
            path:"posted",
            loadChildren: 'src/app/dashboardComponents/posted-j/posted-j.module#PostedJPageModule'
          },/*
          {
            path:"applied-jobs",
            component:AppliedJobsPage
          },
          {
            path:"job-completed",
            component:JobCompletedPage
          },
          {
            path:"applicants",
            component:ApplicantsPage
          },

        ]
      },*/
      {
        path: "profile-edit",
        component: ProfileEditPage
      },
      {
        path: "settings",
        component: SettingsPage
      }
    ]
  }
]}]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class DashboardPageModule {}
