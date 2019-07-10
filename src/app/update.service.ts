import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient) { }


 privatePhotoUpdate = "https://quickjobsapi.herokuapp.com/api/photoupdate"
 privateDeleteAccount = "https://quickjobsapi.herokuapp.com/api/:id"

   updatePhoto(id,photo){
    return this.http.put(this.privatePhotoUpdate,{
      params:{
        id:id,
        photo:photo
      }
    })
  }


  deleteAccount(id){
    return this.http.delete(this.privateDeleteAccount,{
      params:{
        id:id
      }
    })
  }

}
