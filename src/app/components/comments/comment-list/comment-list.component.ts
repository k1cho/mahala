import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  formData: any;
  constructor() {}

  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content');
    this.formData = {};
  }

  ngAfterViewInit() {
    this.toolbarElement.style.display = 'none';
  }

  createComment() {
    console.log(this.formData);
  }
}
