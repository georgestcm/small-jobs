import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private http: HttpClient) { }

getSubscription = "http://localhost:3000/api/v1/subscription"
checkSubscription(id){
  return this.http.get(this.getSubscription,{
    params: {
      id:id
    }
  })
}
}
