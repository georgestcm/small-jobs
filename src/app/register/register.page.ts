import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
public  iconLink: string ="assets/imgs/icon.png";
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
