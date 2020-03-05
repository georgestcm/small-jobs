import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {ReviewService} from 'src/app/review.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
applicant_identification;
  constructor(private _router:Router,
  public alertController: AlertController,
public modalController: ModalController,
public storage: Storage,
public _review: ReviewService,
public loadingController: LoadingController) { }
currentUser;

  ngOnInit() {
    this.storage.get('user').then((value)=>{
      this.currentUser = value;
         this.reviewData.poster_id = value._id,
         this.reviewData.poster_first_name = value.first_name,
         this.reviewData.poster_last_name = value.last_name

    })

  }

rate =  0;
review = '';
reviewData = {
  poster_id:"",
  poster_first_name: "",
  poster_last_name: "",
  review: "",
  rating:null
}
  toHome(){
       this._router.navigate(['dashboard/home'])
  }

  ionViewWillEnter(){
    this.storage.get('user').then((value)=>{
      this.currentUser = value;
         this.reviewData.poster_id = value._id,
         this.reviewData.poster_first_name = value.first_name,
         this.reviewData.poster_last_name = value.last_name
    })
  }

  dismiss(){
    this.modalController.dismiss()
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

          }
      }] })

      await alert.present();
    }

    async home(msg) {
        const alert = await this.alertController.create({
          header: '',
          subHeader: '',
          message: msg,
          buttons: [{
          text: 'ok',
          role: 'ok',
          handler: () => {
             this.dismiss()
            }
        }] })

        await alert.present();
      }


async errorAlert(msg){
  const alert = await this.alertController.create({
    header: '',
    subHeader: '',
    message: msg,
    buttons: [{
    text: 'Ok',
    role: 'ok'  }]})

  await alert.present();

}
    onModelChange(e){
      console.log(e)
      this.rate = e;
    }

    submitReview () {
      if(this.reviewData.rating ===0){
        this.errorAlert("Please add a rating")
      } else if(this.reviewData.review.length ===0 || this.reviewData.review.length < 10 ){
        this.errorAlert("Review must be 10 character or more")
      }
      else {
       console.log(this.applicant_identification)
        this._review.postreview("5dc716e99f425800177ae0c7",this.reviewData)
        .subscribe(
          res=>(
            this.home("Thank you for the review")
          ),
          err=> console.log(err)
        )

      }
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
          message: 'loading',
          duration: 1000
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
      }

    async presentAlert(header,msg) {
        const alert = await this.alertController.create({
          header: header,
          message: msg
        })
        ;

    await alert.present();
  }
}
