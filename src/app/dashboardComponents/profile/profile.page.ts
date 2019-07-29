import { Component, OnInit } from '@angular/core';
import { DataService} from 'src/app/data.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public _data: DataService) { }
  data;
   user = {
     photo:'',
     name:'',
     reviews:[]
   };
   id;

  ngOnInit() {
  }


  ionViewWillEnter(){
    this._data.currentId
    .subscribe(value => this.id = value)
    this._data.getCurrentUser(this.id)
   .subscribe (
      res=> (
        this.data = res,
       this.user.name = this.data.first_name+' '+this.data.last_name,
       this.user.photo = this.data.profile_photo,
       this.user.reviews = this.data.reviews
     ),
      err=> console.log(err)
   )
  }
  }
