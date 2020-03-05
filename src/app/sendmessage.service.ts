import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class SendmessageService {

  sendmessagelink = "https://huslapi.herokuapp.com/api/message"

  constructor(private http: HttpClient) { }

  sendmessage(body,poster_number){
    return this.http.post<any>(this.sendmessagelink,body,{
      params: {
        number: poster_number
      }
    })
  }
}
