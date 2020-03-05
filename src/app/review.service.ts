import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

apppost = "https://huslapi.herokuapp.com/api/applicantspost"
appdelete = "https://huslapi.herokuapp.com/api/applicantsdelete"
reviewpost = "https://huslapi.herokuapp.com/api/reviewpost"
  constructor(private http: HttpClient) { }

  postapplicants(id,app){
    return this.http.post<any>(this.apppost,app,{
      params: {
        id:id
      }
    })
  }

  deleteapp(user_id,app_id){
    return this.http.delete<any>(this.appdelete,{
      params: {
        id:user_id,
        appid:app_id
      }
    })
  }

  postreview(user_id,review){
    return this.http.post(this.reviewpost,review,{
      params: {
        id: user_id
      }
    })
  }
}
