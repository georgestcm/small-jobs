import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { UpdateService } from 'src/app/update.service';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  userData;
  constructor(public actionSheetController: ActionSheetController,
              private router: Router,
              public _data: DataService,
              public storage: Storage,
              private camera: Camera,
              public _update: UpdateService) { }

  ngOnInit() {
    this.userData = this.storage.get('user');
    this.storage.get('user').then((value)=>{
      this.userData = value;
    });
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }



  async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Profile',
        buttons: [{
          text: 'Settings',
          role: 'destructive',
          icon: 'settings',
          handler: () => {
            this.router.navigate(['dashboard/settings'])
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }


    snapPic(){
      this.camera.getPicture(this.options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
  this._update.updatePhoto(this.userData._id,base64Image)
    }, (err) => {
      console.log(
        err
      )
    });
    }

  }
