import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-center',
  templateUrl: './job-center.page.html',
  styleUrls: ['./job-center.page.scss'],
})
export class JobCenterPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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
