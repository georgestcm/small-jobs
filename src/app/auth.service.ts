import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerUrl = "https://huslapi.herokuapp.com/api/register"
  //private registerTesting ="http://localhost:3000/api/register"
  private loginTesting ="http://localhost:3000/api/login"
  private _loginUrl = "https://huslapi.herokuapp.com/api/login"
  constructor(private http: HttpClient, private _router:Router,private storage: Storage) { }
  registerUser(user){
    return this.http.post<any>(this._loginUrl,user)
  }

loginUser(user){
 return this.http.post<any>(this._loginUrl,user)
}

loggedIn(){
  //return this.storage.get('token')
  //console.log(!!this.storage.get('token'))
  return this.storage.get('token').then((token)=>{
    if(token){
      return true
    } else {
      return false//change to false
    }
  })
}

getToken(){
  return this.storage.get('token')
}

logoutUser(){
  this.storage.remove('token')
  this.storage.remove('user')
 //this._router.navigate(['/login'])

}
}
