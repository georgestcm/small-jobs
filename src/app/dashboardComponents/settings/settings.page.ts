import { Component, OnInit } from '@angular/core';
import { UpdateService} from 'src/app/update.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

userData;
  constructor(private _update: UpdateService,private _authService: AuthService,
    private _router:Router,
    public storage: Storage,
  public alertController: AlertController) { }

  ngOnInit() {
    this.userData = this.storage.get('user');
    this.storage.get('user').then((value)=>{
      this.userData = value;
    });
  }

logout(){
  this._authService.logoutUser()
}

async alert(msg) {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: msg,
      buttons: [{
      text: 'Ok',
      role: 'ok',
      handler: () => {
         this._update.deleteAccount(this.userData._id)
         .subscribe(
           res=> (
             console.log(res),
             this._authService.logoutUser()
           ),
           err=> console.log(err)
         )
        }
    }] })

    await alert.present();
  }

delete(){
  this.alert("Do you really want to delete this account?")
}

toPasswordChange(){
  this._router.navigate(['dashboard/passwordchange'])
}

toEmailChange(){
  this._router.navigate(['dashboard/emailchange'])
}
toNumberChange(){
  this._router.navigate(['dashboard/numberchange'])
}

toVerify(){
  this._router.navigate(['dashboard/verify'])
}
}
