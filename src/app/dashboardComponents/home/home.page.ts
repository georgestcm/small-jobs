import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DataService} from 'src/app/data.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {ReviewService} from 'src/app/review.service'
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SubscriptionService } from 'src/app/subscription.service';
import { SendmessageService } from 'src/app/sendmessage.service';
import { Router } from '@angular/router'
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
public distance: String;
public long:Number;
public lat:Number;
appliedJobs;
usersNear;
 jobsNear=[];
 appliedjobsId= [];
 allJobsNear;
id;
data;
jobToPost;
applyOrNot: boolean;
//jobsending
myInfo= {
  email:'',
  number:'',
  name: ''
}

poster_number;
posterData;
job;
text={
msg:''
}
nearButNotApplied;
currentUser = {
  applicant_job_title:"",
  applicant_first_name: "",
  applicant_last_name: "",
  applicant_id:""
}

//subscription
current_user_subscription_id;
subscription_data;
//jobsending

  constructor(public _data: DataService,
    public _review: ReviewService,
    private route: ActivatedRoute,
    private geolocation: Geolocation,
    public storage: Storage,
    public alertController: AlertController,
    private photoViewer: PhotoViewer,
    private _subscription: SubscriptionService,
    private _router:Router,
    public _sendM: SendmessageService,
    private menu: MenuController,
  public plt: Platform) {
 }

  ngOnInit() {
  this.storage.get('user').then((value)=>{
    this.id = value._id;
  this.currentUser.applicant_id = value._id;
  this.myInfo.email = value.email;
  this.myInfo.number = value.phone_number;
  this.myInfo.name = value.first_name +' '+ value.last_name;
  this.distance = "1609.34";
  this.openFirst();
  })
  }

  openFirst() {
      this.menu.open();
    }


trackMe(){
  let watch = this.geolocation.watchPosition();
  watch.subscribe((data) => {
    this.lat = data.coords.latitude
    this.long = data.coords.longitude
    this.getUsers()
  });

}
  ionViewWillEnter(){
    this.storage.get('user').then((value)=>{
      this.id = value._id;
    this.myInfo.email = value.email;
    this.myInfo.number = value.phone_number;
    this.myInfo.name = value.first_name +' '+ value.last_name;
    this.distance = "1609.34";
    this.currentUser.applicant_id = value._id;
    this.currentUser.applicant_first_name = value.first_name;
    this.currentUser.applicant_last_name = value.last_name;
    })
  this.trackMe()
  }

  doRefreshTwo() {
    this.getUsers();
    setTimeout(() => {
      console.log('Async operation has ended');
      //event.target.complete();
    }, 1000);
  }

  doRefresh(event) {
    this.getUsers();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
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



  disablebutton(id){
    if(this.id === id){
      return true
    } else {
      return false
    }
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

    getApplied(){
      this._data.getAppliedJobs(this.id)
      .subscribe(
        res=>(
          this.appliedJobs = res
        ),
        err=> console.log(err)
      )
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
this.getApplied()
   this._data.setPosition(this.distance,this.long,this.lat)
   .subscribe(
     res =>(
       console.log(res),
       this.usersNear = res,
       console.log("jobs loaded"+' '+this.distance+' '+this.long+' '+this.lat)
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

 let applied = this.appliedJobs;
 let jobsN = this.allJobsNear;

 this.nearButNotApplied = this.allJobsNear.filter(({
   _id: nearId
 }) => !this.appliedJobs.some(({
   _id: appliedId
 }) => appliedId === nearId));

console.log(this.nearButNotApplied)
 }



checkSubscriptionStatusApply(){
   this._subscription.checkSubscription(this.id)
   .subscribe(
     res =>(
    this.data=res,
    //console.log(this.data.statusCode),
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

apply(job){
  /*if(this.current_user_subscription_id){
    this._subscription.checkSubscription(this.current_user_subscription_id)
    .subscribe (
      res =>(
        console.log(res),
        this.subscription_data =res
      ),
      err => console.log(err)
    )
  } else {
    this.alert("You need to subscribe to apply")
  }


  if(this.subscription_data.status === "trialing" || this.subscription_data.status === "active" ) {
    this.job = job;
    this.text.msg ='User'+' '+this.myInfo.name+' '+ 'has applied to work for you. On the job titled'+' '+`'${job.job_title}'`+' '+'The applicant contact informations are:'+' '+'Email:'+' '+this.myInfo.email+', '+'Phone number:'+' '+this.myInfo.number;
    this._data.getCurrentUser(job.poster_id)
      .subscribe(
        res=>(
          this.posterData = res,
          this.poster_number  ='+1'+this.posterData.phone_number,
          console.log(this.poster_number),
          console.log(this.text),
          this._sendM.sendmessage(this.text,this.poster_number)
          .subscribe(
            res=>(
              this.presentAlert("Applied"),
              console.log(res)
            ),
            err=> console.log(err)
          )
        ),
        err=> console.log(err)
      )
      //this.poster_number ='+1';
      //console.log(this.poster_number);
      this._data.postApplied(job,this.id)
      .subscribe(
        res=>(
          console.log(res),
          this.presentAlert("Applied"),
          this.doRefreshTwo()
        ),
        err=> console.log(err)
      )
    //applicants
    console.log(this.currentUser)
    this.currentUser.applicant_job_title = job.job_title;
  this._review.postapplicants(job.poster_id,this.currentUser)
  .subscribe(
    res=>(
    console.log(res)
    ),
    err=> console.log(err)
  )

} else {
  this.alert("Subscription payment failed")
} */
this.job = job;
this.text.msg ='User'+' '+this.myInfo.name+' '+ 'has applied to work for you. On the job titled'+' '+`'${job.job_title}'`+' '+'The applicant contact informations are:'+' '+'Email:'+' '+this.myInfo.email+', '+'Phone number:'+' '+this.myInfo.number;
this._data.getCurrentUser(job.poster_id)
  .subscribe(
    res=>(
      this.posterData = res,
      this.poster_number  ='+1'+this.posterData.phone_number,
      console.log(this.poster_number),
      console.log(this.text),
      this._sendM.sendmessage(this.text,this.poster_number)
      .subscribe(
        res=>(
          this.presentAlert("Applied"),
          console.log(res)
        ),
        err=> console.log(err)
      )
    ),
    err=> console.log(err)
  )
  //this.poster_number ='+1';
  //console.log(this.poster_number);
  this._data.postApplied(job,this.id)
  .subscribe(
    res=>(
      console.log(res),
      this.presentAlert("Applied"),
      this.doRefreshTwo()
    ),
    err=> console.log(err)
  )
//applicants
console.log(this.currentUser)
this.currentUser.applicant_job_title = job.job_title;
this._review.postapplicants(job.poster_id,this.currentUser)
.subscribe(
res=>(
console.log(res)
),
err=> console.log(err)
)


}


toProfile(id){
  this._data.changeId(id)
  this._router.navigate(['dashboard/profile'])
}


}
