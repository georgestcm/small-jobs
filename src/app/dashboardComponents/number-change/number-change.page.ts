import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'
@Component({
  selector: 'app-number-change',
  templateUrl: './number-change.page.html',
  styleUrls: ['./number-change.page.scss'],
})
export class NumberChangePage implements OnInit {

  numberCheckChange = {
    check:false,
    submit:true
  }

  checkNumber = {
    username:null,
    phone_number:null
  }

 newNumber = {
   id:null,
   phone_number:null
 }
 numberText = "current"
  constructor(
    public _data:DataService,
      public storage: Storage,
      public alertController: AlertController,
      private _router:Router
  ) { }


  ngOnInit() {
    this.storage.get('user').then((value)=>{
      this.checkNumber.username = value.username;
      this.newNumber.id  = value._id
    })
  }

  check = (boolean)=>{
    if(boolean){
      this.numberCheckChange.check = true;
      this.numberCheckChange.submit = false;
      this.presentAlert("Enter your new number")
      this.numberText = "new"
    } else {

    }
  }

 changeNumberCompleted = (boolean)=>{
    if(boolean){
      this.presentAlert("Your phone number has been changed")
      this._router.navigate(['dashboard/home'])
    } else {
      this.presentAlert("Your password has not been changed, please try again")
      this.numberCheckChange.check = false;
      this.numberCheckChange.submit = true;
    }
 }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header:  "",
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

numberCheck(){
  this._data.checkNumber(this.checkNumber.username,this.checkNumber.phone_number)
  .subscribe(
    res=> (
      this.check(res)
    ),
    err => this.presentAlert("The number you entered is wrong")
  )
}

changeNumber(){
  if(this.newNumber.phone_number.length< 10 || this.newNumber.phone_number.length> 10){
    this.presentAlert("Please enter a correct phone number")
  } else {
    this._data.changeNumber(this.newNumber)
    .subscribe(
      res=>(
      this.changeNumberCompleted(res)
      ),
      err=> console.log(err)
    )
  }
}
}
