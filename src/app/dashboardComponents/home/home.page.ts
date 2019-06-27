import { Component, OnInit } from '@angular/core';
import { DataService} from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
public distance: String;
public long:Number;
public lat:Number;

usersNear;
 jobsNear=[];
 allJobsNear;

  constructor(public _data: DataService,
    private route: ActivatedRoute,
    public storage: Storage,
    public alertController: AlertController,
  private photoViewer: PhotoViewer) {
 }

  ngOnInit() {
  this.storage.get('user').then((value)=>{
 this.long = value.geometry.coordinates[0];
 this.lat = value.geometry.coordinates[1];
 console.log(value)
 this.distance = "1609.34";
 this.getUsers()
 })

  }
  doRefresh(event) {
    this.getUsers();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  viewImg(src){
    this.photoViewer.show(src);
  }
  async presentAlert(msg) {
      const alert = await this.alertController.create({
        header: 'Job Description',
        subHeader: '',
        message: msg,
        buttons: ['OK']
      });

      await alert.present();
    }


 getUsers() {
  while(this.jobsNear.length>0){
    this.jobsNear.pop()
  }

   this._data.setPosition(this.distance,this.long,this.lat)
   .subscribe(
     res =>(
       this.usersNear = res
     ),
     err => console.log(err),
     ()=> this.loadJobs()
   )
 }

 viewImg(src){
   this.photoViewer.show(src);
 }

setDistance(distance){
  this.distance = distance;
  this.getUsers();
}

loadJobs(){
  this.usersNear.forEach((user)=>{
  this.jobsNear.push(user.postedJobs)
})
this.allJobsNear= Array.prototype.concat.apply([], this.jobsNear);
console.log(this.allJobsNear)
}
}
