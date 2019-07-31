import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import {ReviewService} from 'src/app/review.service'
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router'
@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.page.html',
  styleUrls: ['./applicants.page.scss'],
})
export class ApplicantsPage implements OnInit {

  constructor(public alertController: AlertController,
  public _data: DataService,public storage: Storage,
public _review: ReviewService,private _router:Router) { }
  currentUser;
  userData;
  applicants;
  myId;
  reviewData = {
    poster_id:"",
    poster_first_name: "",
    poster_last_name: "",
    review: ""
  }
  ngOnInit() {
  }


  ionViewWillEnter(){
    this.currentUser = this.storage.get('user');
    this.storage.get('user').then((value)=>{
      this.currentUser = value;
      this.myId = value._id;
      this._data.getCurrentUser(this.currentUser._id)
      .subscribe(
        res=>(
         this.userData = res,
         this.applicants = this.userData.applicants,
         this.reviewData.poster_id = value._id,
         this.reviewData.poster_first_name = value.first_name,
         this.reviewData.poster_last_name = value.last_name
        ),
        err=> console.log(err)
      )
    })
  }

  async presentAlertPrompt(id) {
      const alert = await this.alertController.create({
        header: "Review",
        inputs: [
          {
            name: 'review',
            type: 'text',
            placeholder: ''
          }
        ],
        buttons: [
          {
            text: 'add review',
            role: 'ok',
            handler: (d)=> {
              this.reviewData.review = d.review;

              console.log(d.review);
              this.addReview(id,this.reviewData);
            }
          }
        ]
      });

      await alert.present();
    }

    async presentAlert(header,msg) {
        const alert = await this.alertController.create({
          header: header,
          message: msg
        })
        ;

    await alert.present();
  }


    addReview(user_id,text){
      this._review.postreview(user_id,text)
      .subscribe(
        res=>(
          this.presentAlert("Review","Thank you for the review")
        ),
        err=> console.log(err)
      )
    }

    deleteAppli(user_id,app_id){
      this._review.deleteapp(user_id,app_id)
      .subscribe(
        res=>(
          this.presentAlert("Applicant","Applicant deleted"),
          this.ionViewWillEnter()
        ),
        err=> console.log(err)
      )
    }

    toProfile(id){
      this._data.changeId(id)
      this._router.navigate(['dashboard/profile'])
    }
}
