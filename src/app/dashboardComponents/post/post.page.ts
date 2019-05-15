import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  const pageTitle:string = "create a new job"
  constructor() { }

  ngOnInit() {
  }

}
