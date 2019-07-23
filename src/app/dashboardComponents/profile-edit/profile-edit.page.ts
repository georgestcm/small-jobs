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
  photoToSend;
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
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  GalleryOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
   }

ionViewWillEnter(){
  this._data.getCurrentUser(this.userData._id)
  .subscribe(
    res=>(
  this.storage.set('user',res)
    ),
    err=> console.log(err)
  )
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

    async presentActionSheetTwo() {
        const actionSheet = await this.actionSheetController.create({
          header: 'Upload',
          buttons: [{
            text: 'Camera',
            icon: 'Camera',
            handler: () => {
              this.camera.getPicture(this.options).then((imageData) => {
             let base64Image = 'data:image/jpeg;base64,' + imageData;
                 this.photoToSend = base64Image;
                 this.updatePhoto();
            }, (err) => {
            });
            }
          }, {
            text: 'Gallery',
            icon: 'image',
            handler: () => {
              this.camera.getPicture(this.GalleryOptions).then((imageData) => {
             let base64Image = 'data:image/jpeg;base64,' + imageData;
                 this.photoToSend = base64Image;
                 this.updatePhoto();
            }, (err) => {
            });
            }
          },{
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
  this.presentActionSheetTwo()
    }



    updatePhoto(){
      console.log(this.userData._id)
      this._update.updatePhoto(this.userData._id,this.photoToSend)
      .subscribe(
        res =>(
          console.log(res),
          this.storage.set('user',res)
        )
      ,
        err => console.log(err)
      )
    }
  }
