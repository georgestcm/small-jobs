import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  toMessages(){
      this.router.navigate(['dashboard/messages'])
    }
    toHome(){
        this.router.navigate(['dashboard/home'])
      }
      toPosted(){
          this.router.navigate(['dashboard/posted'])
        }
        toPayments(){
            this.router.navigate(['dashboard/payments'])
          }

    toSettings(){
      this.router.navigate(['dashboard/settings'])
    }
}
