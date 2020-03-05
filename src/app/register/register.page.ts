import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AuthService } from '../auth.service';
import {DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 img = 'data:image/png;base64,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'

  constructor(private router: Router,public alertController: AlertController,private geolocation: Geolocation,private _auth: AuthService,public _data: DataService,
  private storage: Storage, public loadingController: LoadingController,private _document: DocumentViewer) { }
  loaderToShow;
   registerData = {
     username:"",
     password:"",
     first_name:"",
     last_name:"",
     email:"",
     profile_photo:this.img,
     phone_number:'',
      geometry:{
        "type":"",
        coordinates: []
      }
   }

   re_password;

DocumentViewerOptions = {
  title: 'My PDF'
}

  ngOnInit() {
  }

ionViewWillEnter(){
  this.geolocation.getCurrentPosition().then((resp) => {

    this.registerData.geometry = {
"type" : "Point",
coordinates : [
  resp.coords.longitude,
  resp.coords.latitude
]
}
}).catch((error) => {
console.log('Error getting location', error);
});
}
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header:  "Registration",
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  /*registerUser() {
    if(this.registerData.username.length ===0){
      this.presentAlert("You can not register without a username")
    } else {
      if(this.registerData.password.length===0){
        this.presentAlert("You can not register without a password")
      } else {
        if(this.registerData.first_name.length===0 || this.registerData.last_name.length===0){
          this.presentAlert("You can not register without a name")
        } else {
          if(this.registerData.email.length===0 || this.registerData.email.toLowerCase().indexOf('@') ===-1){
            this.presentAlert("You can not register without a valid email")
          } else {
            if(this.registerData.phone_number.toString().length>10 || this.registerData.phone_number.toString().length < 10){
              this.presentAlert("You must enter a valid phone number to register")
            } else {
              console.log(this.registerData)
                this._auth.registerUser(this.registerData)
                .subscribe(
                  res =>(
                    this.storage.set('token',res.token),
                    this.router.navigate(['/dashboard']),
                    console.log(res.registerUser),
                    this.storage.set('user',res.registerUser),
                    this.registerData.username='',
                    this.registerData.password='',
                    this.registerData.first_name='',
                    this.registerData.last_name='',
                    this.registerData.email='',
                    this.registerData.phone_number='',
                  ),
                  err => (console.log(err),
                         this.presentAlert(err.error))
                )
              }
            }
          }
        }
      }
    }*/


    register() {
      this.loaderToShow = this.loadingController.create({
        message: 'Loading'
      }).then((res) => {
        res.present();

        if(this.registerData.username.length ===0){
          this.hideLoader();
          this.presentAlert("You can not register without a username")
        } else {
          if(this.registerData.password.length===0){
            this.hideLoader();
            this.presentAlert("You can not register without a password")
          } else if(this.re_password !== this.registerData.password){
            this.presentAlert("Password incorrect, re-enter your password")
            this.loadingController.dismiss();
          }else {
            if(this.registerData.first_name.length===0 || this.registerData.last_name.length===0){
              this.hideLoader();
              this.presentAlert("You can not register without a name")
            } else {
              if(this.registerData.email.length===0 || this.registerData.email.toLowerCase().indexOf('@') ===-1){
                this.hideLoader();
                this.presentAlert("You can not register without a valid email")
              } else {
                if(this.registerData.phone_number.toString().length>10 || this.registerData.phone_number.toString().length < 10){
                  this.hideLoader();
                  this.presentAlert("You must enter a valid phone number to register")
                } else {
                  console.log(this.registerData)
                    this._auth.registerUser(this.registerData)
                    .subscribe(
                      res =>(
                        this.storage.set('token',res.token),
                        this.router.navigate(['/dashboard']),
                        console.log(res.registerUser),
                        this.storage.set('user',res.registerUser),
                        this.registerData.username='',
                        this.registerData.password='',
                        this.registerData.first_name='',
                        this.registerData.last_name='',
                        this.registerData.email='',
                        this.registerData.phone_number='',
                        this.hideLoader()
                      ),
                      err => (console.log(err),
                      this.hideLoader(),
                      this.presentAlert(err.error))
                    )
                  }
                }
              }
            }
          }

      });
    }

    hideLoader() {
     this.loadingController.dismiss();
    }



/*  register(){
   this.registerUser()
} */

getPosition() {
  this.geolocation.getCurrentPosition().then((resp) => {
this.registerData.geometry = {
        "type" : "Point",
        "coordinates" : [
        resp.coords.latitude,
        resp.coords.longitude ]  }
}).catch((error) => {
      console.log('Error getting location', error);
});
}

toLogin(){
    this.router.navigate(['login'])
}

toTerms(){
  this._document.viewDocument('assets/pdf/terms_and_conditions.pdf', 'application/pdf', this.DocumentViewerOptions)
}

toPrivacy(){
    this._document.viewDocument('assets/pdf/privacy_policy.pdf', 'application/pdf', this.DocumentViewerOptions)
}
}
