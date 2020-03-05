import { Component, OnInit } from '@angular/core';
import { DataService} from 'src/app/data.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-job-completed',
  templateUrl: './job-completed.page.html',
  styleUrls: ['./job-completed.page.scss'],
})
export class JobCompletedPage implements OnInit {
id;
jobCompleted;
  constructor(
    public _data: DataService,
    public storage: Storage,
  public alertController: AlertController,
  private photoViewer: PhotoViewer,
  public plt: Platform
  ) { }

  ngOnInit() {
    this.storage.get('user').then((value)=>{
      this.id = value._id;
      this.getCompletedJobs()
    });
  }

  doRefresh(event) {
    this.getCompletedJobs()
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


  async alert(msg,data) {
      const alert = await this.alertController.create({
        header: '',
        subHeader: '',
        message: msg,
        buttons: [{
        text: 'Ok',
        role: 'ok',
        handler: () => {
             this._data.completedDelete(this.id,data)
             .subscribe(
               res=> (
                 console.log(res)
               ),
               err => console.log(err)
             )
             this.getCompletedJobs();
          }
      }] })

      await alert.present();
    }

    getCompletedJobs(){
      this._data.completedGet(this.id)
      .subscribe(
        res=>(
          this.jobCompleted = res
        ),
        err=> console.log(err)
      )
    }

    delete(data){
       this.alert("Are you sure you want to delete?",data)
    }
}
