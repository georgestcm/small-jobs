import { Component, OnInit } from '@angular/core';
import { DataService} from 'src/app/data.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-posted-j',
  templateUrl: './posted-j.page.html',
  styleUrls: ['./posted-j.page.scss'],
})
export class PostedJPage implements OnInit {

  constructor(public _data: DataService,
  private photoViewer: PhotoViewer,
public storage: Storage,
public alertController: AlertController,
public plt: Platform,
private router: Router) { }
   id;
   jobid;
   allJobs;
  ngOnInit() {
    this.storage.get('user').then((value)=>{
      this.id = value._id;
        this.getPostedJobs()
    });
  }

  doRefresh(event) {
    this.getPostedJobs();
    setTimeout(() => {
      console.log('Async operation has ended');
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

  async presentAlert(msg) {
      const alert = await this.alertController.create({
        header: 'Job Description',
        subHeader: '',
        message: msg,
        buttons: ['OK']
      });

      await alert.present();
    }

    async alert(msg,id) {
        const alert = await this.alertController.create({
          header: '',
          subHeader: '',
          message: msg,
          buttons: [{
          text: 'Ok',
          role: 'ok',
          handler: () => {
            this._data.deleteJob(this.id,id)
             .subscribe (
               res=> (
                 this.getPostedJobs()
               ),
               err =>{ console.log(err)
               this.getPostedJobs()}
             )
            }
        }] })

        await alert.present();
      }

 getPostedJobs(){
   this._data.getPostedJobs(this.id)
   .subscribe (
     res => (
       this.allJobs = res
     ),
     err => console.log(err)
   )
 }

delete(jobid){
this.alert("Are you sure?",jobid)

}

toJobCenter(){
  this.router.navigate(['dashboard/job-center'])
}

}
