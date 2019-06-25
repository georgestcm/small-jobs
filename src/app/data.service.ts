import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class DataService {



  constructor(private http: HttpClient,public storage: Storage) { }
  private _userNearMeUrl = "http://localhost:3000/api/nearme/"
  private _jobPostUrl = "http://localhost:3000/api/post"

    setPosition(distance,long,lat){
  return this.http.get<any>(this._userNearMeUrl,{params:{
    distance:distance,
    long: long,
    lat: lat
  }})
  }

postJob(data){
  return this.http.post<any>(this._jobPostUrl,data)
}

}
