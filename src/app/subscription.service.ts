import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private http: HttpClient) { }

getSubscription = "https://quickjobsapi.herokuapp.com/api/v1/subscription"
createCustomer = "https://quickjobsapi.herokuapp.com/api/v1/createcustomers"
checkSubscription(id){
  return this.http.get(this.getSubscription,{
    params: {
      id:id
    }
  })
}

addCustomer(id,token){
  return this.http.post(this.createCustomer,{
    params: {
      id: id,
      token: token
    }
  })
}
}
