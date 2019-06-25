import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from './auth.service'
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private _authService: AuthService, private _router:Router,private storage: Storage){

}

/*checkAuth(): boolean {
    return !!Promise.resolve("token")
  }
canActivate() {
      if (this.checkAuth()) {
        return true;
      } else {
        return false;
      }
    } */
/*canActivate(){
/*  this._authService.loggedIn().then((token)=>{
    if(token){
      return true
    } else {
      this._router.navigate(['/login'])
      return false
    }
  }) */
  /*if(this._authService.loggedIn()){
    return true
    window.alert(true)
  } else {
    return false
    window.alert(false)
  }
} */

async canActivate(): Promise<boolean> {
    if(await this._authService.loggedIn()){
      return true
    } else {
      this._router.navigate(['/login'])
      return false
    };
  };
}
