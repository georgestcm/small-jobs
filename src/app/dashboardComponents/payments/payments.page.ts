import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { SubscriptionService } from 'src/app/subscription.service'
@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
public  iconLink: string ="/assets/imgs/icon.png";
  constructor(private stripe: Stripe,private _subscription: SubscriptionService) {}

  ngOnInit() {
    this.stripe.setPublishableKey('pk_test_OR9yEz19qnyImgqlHLaqBEwO00S5J9STou');
  }

   card = {
     number:Number,
     expMonth:Number,
     expYear:Number,
     cvc:Number
  }

log(){
  console.log(this.card)
}
createToken(card){
  this.stripe.createCardToken(card)
   .then(token => console.log(token.id))
   .catch(error => console.error(error));
}


}
