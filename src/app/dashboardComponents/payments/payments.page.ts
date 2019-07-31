import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { SubscriptionService } from 'src/app/subscription.service'
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
public  iconLink: string ="/assets/imgs/icon.png";
  constructor(private stripe: Stripe,private _subscription: SubscriptionService,public alertController: AlertController,public storage: Storage) {}

  ngOnInit() {
    this.storage.get('user').then((value)=>{
      this.id = value._id;
   })

    this.stripe.setPublishableKey('pk_test_OR9yEz19qnyImgqlHLaqBEwO00S5J9STou');
  }

  id;
  token;
  card = {
     number:undefined,
     expMonth:undefined,
     expYear:undefined,
     cvc:undefined
  }

trial(){
  this.presentAlert("You are currently on trial and you will be promped to subscribe after the trial")
}

createToken(){
  this.stripe.createCardToken(this.card)
   .then((token)=>{
     console.log(token);
     this.token = token.id
     this.createCustomer()
   })
   .catch(error => this.presentAlert("Please check card details before submition"));
}

async presentAlert(msg) {
  const alert = await this.alertController.create({
    header:  "",
    message: msg,
    buttons: ['OK']
  });

  await alert.present();
}

createCustomer(){
  this._subscription.addCustomer(this.id,this.token)
  .subscribe(
    res=> (
     console.log(res)
    ),
    err=>(
      console.log(err)
    )
  )
}
}
