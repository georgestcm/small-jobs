import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient) { }


 privatePhotoUpdate = "http://localhost:3000/api/:id/:photo"
 privateDeleteAccount = "http://localhost:3000/api/:id"
  updatePhoto(id,photo){
    this.http.put(this.privatePhotoUpdate,{
      params:{
        id:id,
        photo:photo
      }
    })
  }


  deleteAccount(id){
    this.http.delete(this.privateDeleteAccount,{
      params:{
        id:id
      }
    })
  }

}
