import { Component, OnInit } from '@angular/core';
import { UpdateService} from 'src/app/update.service';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private _update: UpdateService,private _authService: AuthService, private _router:Router,public storage: Storage) { }
 id;
  ngOnInit() {
    this.storage.get('user').then((value)=>{
   this.id = value._id
   })

  }

logout(){
  this._authService.logoutUser()
}

delete(){
  //this._update.deleteAccount(this.id)
  console.log(this.id)
}
}
