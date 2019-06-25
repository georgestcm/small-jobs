import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from "@angular/common/http";
import {DataService} from "src/app/data.service"
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

 jobToPost = {
   _id:'',
job_title:'',
category:'',
description:'',
location:'',
due_date:'',
time:'',
price:undefined,
images: ["https://via.placeholder.com/150","https://via.placeholder.com/150"]
 }

 options: CameraOptions = {
   quality: 100,
   destinationType: this.camera.DestinationType.FILE_URI,
   encodingType: this.camera.EncodingType.JPEG,
   mediaType: this.camera.MediaType.PICTURE
 }

constructor(public _data: DataService,
  public alertController: AlertController,
  private photoViewer: PhotoViewer,
  private camera: Camera,
private _router:Router,
public storage: Storage
) { }

  ngOnInit() {
    this.storage.get('user').then((value)=>{
      this.jobToPost._id = value._id
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

snapPic(){
  this.camera.getPicture(this.options).then((imageData) => {
 let base64Image = 'data:image/jpeg;base64,' + imageData;
 this.jobToPost.images.push(base64Image)
}, (err) => {
});
}

setId(){

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
