import { Component, OnInit } from '@angular/core';
import { DataService} from 'src/app/data.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.page.html',
  styleUrls: ['./applied-jobs.page.scss'],
})
export class AppliedJobsPage implements OnInit {
  id;
  appliedJobs;
  jobid;
  constructor(public _data: DataService,
  public storage: Storage,
public alertController: AlertController,
private photoViewer: PhotoViewer) { }

  ngOnInit() {
    this.storage.get('user').then((value)=>{
      this.id = value._id;
      this.getApplied();
    });
  }


  doRefresh(event) {
    this.getApplied();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
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

  viewImg(src){
    this.photoViewer.show(src);
  }

  async alert(msg,data) {
      const alert = await this.alertController.create({
        header: '',
        subHeader: '',
        message: msg,
        buttons: [{
        text: 'Ok',
        role: 'ok',
        handler: () => {
          /*this._data.changeAppliedValue(data.poster_id,data._id)
          .subscribe(
            res=>(
              console.log(res)
            ),
            err=> console.log(err)
          )*/
         this._data.completedPost(this.id,data)
         .subscribe(
           res=>(
            this.presentAlert(" This job has been added to the completed section for your records")
           ),
           err => console.log(err)
         )
       }
     }] })
      await alert.present();
    }

    async presentAlert(msg){
      const alert = await this.alertController.create({
        header: '',
        subHeader: '',
        message: msg,
        buttons: [{
        text: 'Ok',
        role: 'ok',
        handler: () => {

          }
      }] })

      await alert.present();
    }

 completed(data){
  //  data.completed = "true";
  // console.log(data.completed)
   this.alert("Are you sure you've completed the job?",data)
   //this.getJobId(data._id)
 }

}
