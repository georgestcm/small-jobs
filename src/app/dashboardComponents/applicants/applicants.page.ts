import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.page.html',
  styleUrls: ['./applicants.page.scss'],
})
export class ApplicantsPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlertPrompt() {
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
              console.log(d.review);
            }
          }
        ]
      });

      await alert.present();
    }
}
