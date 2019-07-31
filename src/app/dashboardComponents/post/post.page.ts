import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from "@angular/common/http";
import {DataService} from "src/app/data.service"
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

 jobToPost = {
   poster_id:'',
   job_title:'',
   name: '',
   category:'',
   description:'',
   location:'',
   due_date:'',
   time:'',
   price:undefined,
   images: [],
   completed: false
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
  };

constructor(public _data: DataService,
  public alertController: AlertController,
  private photoViewer: PhotoViewer,
  private camera: Camera,
  private _router:Router,
  public storage: Storage,
  public actionSheetController: ActionSheetController
) { }

  ngOnInit() {
    this.storage.get('user').then((value)=>{
      this.jobToPost.poster_id = value._id
      this.jobToPost.name = value.first_name+" "+value.last_name
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


delete(index){
  this.jobToPost.images.splice(index,1)
}

viewImg(src){
  this.photoViewer.show(src);
}

async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload',
      buttons: [{
        text: 'Camera',
        icon: 'Camera',
        handler: () => {
          this.camera.getPicture(this.options).then((imageData) => {
         let base64Image = 'data:image/jpeg;base64,' + imageData;
         this.jobToPost.images.push(base64Image)
        }, (err) => {
        });
        }
      }, {
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          this.camera.getPicture(this.GalleryOptions).then((imageData) => {
         let base64Image = 'data:image/jpeg;base64,' + imageData;
         this.jobToPost.images.push(base64Image)
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
this.presentActionSheet()
}

post(){
  this._data.postJob(this.jobToPost)
  .subscribe(
    res =>(
       console.log(res),
        this.presentAlert('posted'),
        this._router.navigate(['/dashboard'])

    ),
    //err => this.presentAlert("Login",err.error)
  )
}


}
