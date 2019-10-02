import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/subscription.service'
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
public  iconLink: string ="/assets/imgs/icon.png";
  constructor(private _subscription: SubscriptionService,public actionSheetController: ActionSheetController,public alertController: AlertController,public storage: Storage) {}

  ngOnInit() {
    this.storage.get('user').then((value)=>{
      this.id = value._id;
   })

  }

  id;
  token;
  card = {
     number:undefined,
     expMonth:undefined,
     expYear:undefined,
     cvc:undefined
  }
hiddenNot;
customer_data;
subscription_data;
customer_id;
subscribtion_id;
ionViewWillEnter(){

}

async presentAlert(msg) {
  const alert = await this.alertController.create({
    header:  "",
    message: msg,
    buttons: ['OK']
  });

  await alert.present();
}
async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Subscription',
      buttons: [{
        text: 'Cancel subscription',
        role: 'destructive',
        icon: 'close',
        handler: () => {

        }
      }, {
        text: 'Cancel',
        icon: 'backspace',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

/*createCustomer(){
  this._subscription.addCustomer(this.id,this.token)
  .subscribe(
    res=> (
     console.log(res)
    ),
    err=>(
      console.log(err)
    )
  )
} */
}
