import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private http: HttpClient) { }

getSubscription = "https://quickjobsapi.herokuapp.com/api/v1/subscription"
createSubscriptionLink = "https://quickjobsapi.herokuapp.com/api/v1/createSubscription"
createCustomer = "https://quickjobsapi.herokuapp.com/api/v1/createcustomers"
checkSubscription(id){
  return this.http.get(this.getSubscription,{
    params: {
      id:id
    }
  })
}

addCustomer(token){
  return this.http.post(this.createCustomer,{
    params: {
      token: token
    }
  })
}

/*createSubscription(customer_id){
  return this.http.post(this.createSubscription,{
    params: {
      customer_id: customer_id
    }
  })
} */
}
