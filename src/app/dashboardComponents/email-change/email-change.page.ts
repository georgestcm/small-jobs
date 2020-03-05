import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
@Component({
  selector: 'app-email-change',
  templateUrl: './email-change.page.html',
  styleUrls: ['./email-change.page.scss'],
})
export class EmailChangePage implements OnInit {

  constructor(public _data:DataService,
    public storage: Storage,
    public alertController: AlertController,
    private _router:Router

  ) { }

    currentUser;
  btn = {
    submit:false,
    changeEmail:true
  }

  email = {
    email:'',
    newemail:''
  }

  checkEmailStatus;

  emailChange = {
    id: null,
    email: this.email.newemail
  }

   emailText = "current"

  ngOnInit() {
    this.storage.get('user').then((value)=>{
      this.currentUser = value
      this.emailChange.id = value._id
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

  emailValueChange = (boolean)=>{
    if(boolean){
      this.btn.submit = true;
      this.btn.changeEmail = false;
      this.presentAlert("Enter your new email")
      this.emailText = "new";
    } else {
      this.presentAlert("The email that you've entered is not correct")
    }
  }

emailChanged = (boolean)=>{
  if(boolean){
    this.presentAlert("Your email has been changed")
    this._router.navigate(['dashboard/home'])
  } else {
    this.presentAlert("Your email has not been changed, please try again")
    this.btn.submit = false;
    this.btn.changeEmail = true;
  }
}
 checkEmail(){
  this._data.checkEmail(this.currentUser.username,this.email.email)
  .subscribe (
    res=>(
       this.emailValueChange(res),
       console.log(res)
    ),
   err => this.presentAlert("The email that you've entered is is not correct")
  )
 }

changeEmail(){
  console.log(this.emailChange)
  this._data.changeEmail(this.emailChange)
  .subscribe(
    res=> (
        this.emailChanged(res)
    ),
    err => console.log(err)
  )
}
}
