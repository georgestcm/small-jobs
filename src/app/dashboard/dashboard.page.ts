import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
userData;

  constructor(private router: Router,public _data: DataService,public storage: Storage) { }

  ngOnInit() {
    this.userData = this.storage.get('user');
    this.storage.get('user').then((value)=>{
      this.userData = value;
    });
  }

ionViewWillEnter(){
  this.userData = this.storage.get('user');
  this.storage.get('user').then((value)=>{
    this.userData = value;
  });
}
  toMessages(){
      this.router.navigate(['dashboard/messages'])
    }

 toHome(){
        this.router.navigate(['dashboard'])
      }

  toPayments(){
            this.router.navigate(['dashboard/payments'])
          }

  toSettings(){
      this.router.navigate(['dashboard/settings'])
    }

  toProfileEdit(){
    this.router.navigate(['dashboard/profile-edit'])
  }

toJobCenter(){
  this.router.navigate(['dashboard/job-center'])
}

}
