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
   quality: 50,
   destinationType: this.camera.DestinationType.DATA_URL,
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

snapPic(){
  this.camera.getPicture(this.options).then((imageData) => {
 let base64Image = 'data:image/jpeg;base64,' + imageData;
 this.jobToPost.images.push(base64Image)
}, (err) => {
});
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
