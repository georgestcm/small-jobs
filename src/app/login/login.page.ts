import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {AuthService } from '../auth.service';
import {DataService } from '../data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
loginData = {
  username:'',
  password:''
}
 public  iconLink: string ="assets/imgs/icon.png";
 user;
  constructor(private router: Router,
    private geolocation: Geolocation,
    public loadingController: LoadingController,
    private _auth: AuthService,public _data: DataService,
    private storage: Storage,
    public alertController: AlertController) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
       }).catch((error) => {
        console.log('Error getting location', error);});

  }

  async presentLoading() {
      const loading = await this.loadingController.create({
        message: 'loading',
        duration: 1000
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();
    }

    async presentAlert(header,msg) {
      const alert = await this.alertController.create({
        header:  header,
        message: msg,
        buttons: ['OK']
      });

      await alert.present();
    }

  toPasswordReset(){
      this.router.navigate(['/password-reset'])
    }

    loginUser(){
      //this.presentLoading()
   this._auth.loginUser(this.loginData)
   .subscribe(
     res =>(
       console.log(res),
       this.user = res.user,
       console.log(JSON.stringify(res.user)),
       this.storage.set('user',res.user),
       this.presentLoading(),
       this.storage.set('token',res.token),
       this.router.navigate(['/dashboard'])
     ),
     err => console.log(err)/*this.presentAlert("Login","Please check your credentials")*/
   )
 }

  log(){
  this.loginUser()
  }
}
