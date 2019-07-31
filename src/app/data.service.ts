import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {



  constructor(private http: HttpClient,public storage: Storage) { }
  private profileId = new BehaviorSubject<String>('id');
  currentId = this.profileId.asObservable();
  private _userNearMeUrl = "https://quickjobsapi.herokuapp.com/api/nearme/"
  private _jobPostUrl = "https://quickjobsapi.herokuapp.com/api/post"
  private _getpostedJobs = "https://quickjobsapi.herokuapp.com/api/posted"
  private _deletejob = "https://quickjobsapi.herokuapp.com/api/postedDelete"
  private _getAppliedJobs = "https://quickjobsapi.herokuapp.com/api/appliedget"
  private _getUser = "https://quickjobsapi.herokuapp.com/api/user"
  private _appliedPost = "https://quickjobsapi.herokuapp.com/api/appliedpost"
  private _appliedDelete = "https://quickjobsapi.herokuapp.com/api/applieddelete"
  private _appliedValue = "https://quickjobsapi.herokuapp.com/api/appliedupdate"
  private _completedPost = "https://quickjobsapi.herokuapp.com/api/completedpost"
  private _completedGet = "https://quickjobsapi.herokuapp.com/api/completedget"
  private _completedDelete = "https://quickjobsapi.herokuapp.com/api/completeddelete"

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


getPostedJobs(id){
  return this.http.get<any>(this._getpostedJobs,{
    params: {
      id: id
    }
  })
}

deleteJob(id,jobid){
  return this.http.delete<any>(this._deletejob,{
    params:{
      id:id,
      jobid:jobid
    }
  })
}

getAppliedJobs(id){
  return this.http.get<any>(this._getAppliedJobs,{
    params:{
      id:id
    }
  })
}

appliedDelete(id,jobid){
  return this.http.delete(this._appliedDelete,{
    params: {
      id:id,
      jobid:jobid
    }
  })

}

postApplied(data,id){
  return this.http.post(this._appliedPost,data,{
    params: {
      id:id
    }
  })
}

changeAppliedValue(id,jobid){
  return this.http.put(this._appliedValue,{
    params: {
      id:id,
      jobid:jobid
    }
  })

}

getCurrentUser(id){
  return this.http.get(this._getUser,{
    params:{
      id:id
    }
  })
}

completedPost(id,data){
  return this.http.post<any>(this._completedPost,data,{
    params: {
      id:id
    }
  })
}

completedGet(id){
  return this.http.get<any>(this._completedGet,{
    params: {
      id:id
    }
  })
}

completedDelete(id,jobid){
  return this.http.delete<any>(this._completedDelete,{
    params: {
      id:id,
      jobid: jobid
    }
  })
}

changeId(id:String){
  this.profileId.next(id)
}
}
