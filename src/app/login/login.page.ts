import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 public  iconLink: string ="assets/imgs/icon.png";
  constructor(private router: Router) { }

  ngOnInit() {
  }

  toPasswordReset(){
      this.router.navigate(['/password-reset'])
    }

}
