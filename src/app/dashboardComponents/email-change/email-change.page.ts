import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-email-change',
  templateUrl: './email-change.page.html',
  styleUrls: ['./email-change.page.scss'],
})
export class EmailChangePage implements OnInit {

  constructor(public _data:DataService,
    public storage: Storage,
    public alertController: AlertController

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

  ngOnInit() {
    this.storage.get('user').then((value)=>{
      this.currentUser = value
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
    if(boolean === true){
      this.btn.submit = true;
      this.btn.changeEmail = false;
      this.presentAlert("Enter your new email")
    } else {
      this.presentAlert("The email that you've entered is incorrent")
    }
  }

 checkEmail(){
  this._data.checkEmail(this.currentUser._id,this.email.email)
  .subscribe (
    res=>(
       this.emailValueChange(res)
    ),
    err => console.log(err)
  )
 }

}
