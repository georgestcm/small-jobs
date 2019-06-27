import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-job-center',
  templateUrl: './job-center.page.html',
  styleUrls: ['./job-center.page.scss'],
})
export class JobCenterPage implements OnInit {

  constructor(private router: Router,public storage: Storage) { }
 userData;
  ngOnInit() {
    this.userData = this.storage.get('user');
    this.storage.get('user').then((value)=>{
      this.userData = value;
    });
    console.log(this.userData)
  }


  toApplied(){
    this.router.navigate(['dashboard/applied-jobs'])
  }

  toJobCompleted(){
    this.router.navigate(['dashboard/job-completed'])
  }

  toPosted(){
    this.router.navigate(['dashboard/posted'])
  }
}
