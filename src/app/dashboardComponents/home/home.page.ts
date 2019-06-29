import { Component, OnInit } from '@angular/core';
import { DataService} from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SubscriptionService } from 'src/app/subscription.service';
import { Router } from '@angular/router'
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
id;
data;
  constructor(public _data: DataService,
    private route: ActivatedRoute,
    public storage: Storage,
    public alertController: AlertController,
  private photoViewer: PhotoViewer,
private _subscription: SubscriptionService,
private _router:Router) {
 }

  ngOnInit() {
  this.storage.get('user').then((value)=>{
    this.id = value._id;
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

    async alert(msg) {
        const alert = await this.alertController.create({
          header: '',
          subHeader: '',
          message: msg,
          buttons: [{
          text: 'Ok',
          role: 'ok',
          handler: () => {
             this._router.navigate(['dashboard/payments'])
            }
        }] })

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

checkSubscriptionStatusApply(){
   this._subscription.checkSubscription(this.id)
   .subscribe(
     res =>(
    this.data=res,
    console.log(this.data.statusCode),
    this.checkData()
     ),
     err => console.log(err),
   )
}
checkData(){
  if(this.data.statusCode=404){
    this.alert("you need to subscribe to apply")
  }
}
}
