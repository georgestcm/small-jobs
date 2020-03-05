import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.page.html',
  styleUrls: ['./password-change.page.scss'],
})
export class PasswordChangePage implements OnInit {

  constructor(
    public _data:DataService,
      public storage: Storage,
      public alertController: AlertController,
      private _router:Router
  ) { }

  ngOnInit() {
    this.storage.get('user').then((value)=>{
      this.passwordCheck.username = value.username
      this.passwordChange.username = value.username
    })
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header:  "",
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  btn = {
    check:false,
    submit:true
  }
passwordText = "current";

passwordCheck = {
  username:null,
  password: null
}
passwordChange = {
  username:null,
  password: null
}
passwordCheckBoolean = (boolean)=>{
  if(boolean){
  this.btn.check = true;
  this.btn.submit = false;
    this.presentAlert("Enter your new password")
    this.passwordText = "new"
  } else {
      this.presentAlert("Wrong password,try again")
  }
}

passwordChanged = (boolean) =>{
  if(boolean){
    this.presentAlert("Your password has been changed")
    this._router.navigate(['dashboard/home'])
  } else {
    this.presentAlert("Your password has not been changed, please try again")
    this.btn.check = false;
    this.btn.submit = true;
  }
}
  checkPassword(){
    this._data.checkPassword(this.passwordCheck.username,this.passwordCheck.password)
    .subscribe(
      res=>(
         this.passwordCheckBoolean(res)
      ),
      err => this.presentAlert("Wrong password,try again")
    )
  }

  changePassword(){
    this._data.changePassword(this.passwordChange)
     .subscribe(
       res =>(
           this.passwordChanged(res)
       ),
       err => console.log(err)
     )
  }
}
