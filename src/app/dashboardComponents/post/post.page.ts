import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from "@angular/common/http";
import {DataService} from "src/app/data.service"
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';
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
   price:'',
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
  public actionSheetController: ActionSheetController,
  public plt: Platform
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

viewImg(src,title){
  var options = {
    share: true, // default is false
    closeButton: true, // iOS only: default is true
    copyToReference: true // iOS only: default is false
  };

  if (this.plt.is("ios")) {
    src = decodeURIComponent(src);
  }
  this.photoViewer.show(src,title,options);
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
  if(this.jobToPost.job_title.length===0){
    this.presentAlert('You must enter a job title to submit a job')
  } else {
    if(this.jobToPost.name.length===0){
      this.presentAlert('You must enter a name to submit a job')
    } else {
      if(this.jobToPost.category.length===0){
        this.presentAlert('You choose a category to submit a job')
      } else {
        if(this.jobToPost.description.length===0){
          this.presentAlert('You must write a description to submit a job')
        } else {
          if(this.jobToPost.location.length===0){
            this.presentAlert('You must enter a location to submit a job')
          } else {
            if(this.jobToPost.due_date.length===0){
              this.presentAlert('You must enter a due date to submit a job')
            } else {
              if(this.jobToPost.time.length===0){
                this.presentAlert('You must enter a time to submit a job')
              } else {
                this.jobToPost.time = moment(this.jobToPost.time).format('hh:mm a');
                if(this.jobToPost.price.toString().length===0){
                  this.presentAlert('You must enter a price to submit a job')
                } else {
                  if(this.jobToPost.images.length===0){
                    this.presentAlert('You must add job images to post a job')
                  }else {
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
              }
            }
          }
        }
      }
    }
  }
}

/*jobToPost = {
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
} */
postJob(){
  if(this.jobToPost.job_title.length===0){
    this.presentAlert('You must enter a job title to submit a job')
  } else {
    if(this.jobToPost.name.length===0){
      this.presentAlert('You must enter a name to submit a job')
    } else {
      if(this.jobToPost.category.length===0){
        this.presentAlert('You choose a category to submit a job')
      } else {
        if(this.jobToPost.description.length===0){
          this.presentAlert('You must write a description to submit a job')
        } else {
          if(this.jobToPost.location.length===0){
            this.presentAlert('You must enter a location to submit a job')
          } else {
            if(this.jobToPost.due_date.length===0){
              this.presentAlert('You must enter a due date to submit a job')
            } else {
              if(this.jobToPost.time.length===0){
                this.presentAlert('You must enter a time to submit a job')
              } else {
                if(this.jobToPost.price.length===0){
                  this.presentAlert('You must enter a price to submit a job')
                } else {
                  if(this.jobToPost.images.length>0){
                    this.presentAlert('You must add job images to post a job')
                  }else {
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
              }
            }
          }
        }
      }
    }
  }
}

}
