import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-job-center',
  templateUrl: './job-center.page.html',
  styleUrls: ['./job-center.page.scss'],
})
export class JobCenterPage implements OnInit {

  constructor(private router: Router,public storage: Storage,
  public _data: DataService) { }
 userData;
 postedJobs;
 completedJobs;
 appliedJobs;
 applicants;
 dataLengths;

  ngOnInit() {

  }

  ionViewWillEnter(){
        this.userData = this.storage.get('user');
        this.storage.get('user').then((value)=>{
          this.userData = value;
          this._data.getCurrentUser(this.userData._id)
          .subscribe(
            res=>(
            this.dataLengths = res,
            this.completedJobs = this.dataLengths.completedJobs.length,
            this.appliedJobs= this.dataLengths.appliedJobs.length,
            this.postedJobs = this.dataLengths.postedJobs.length,
            this.applicants = this.dataLengths.applicants.length
            ),
            err=> console.log(err)
          )
        })
  }

  toApplied(){
    this.router.navigate(['dashboard/job-center/applied-jobs'])
  }

  toJobCompleted(){
    this.router.navigate(['dashboard/job-center/job-completed'])
  }

  toPosted(){
    this.router.navigate(['dashboard/job-center/posted'])
  }

  toApplicants(){
    this.router.navigate(['dashboard/job-center/applicants'])
  }
}
