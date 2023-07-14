import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from 'src/app/modals/comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit{
  commentsList!: IComment[];
  commentsVisible: boolean = false

  constructor(private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService)
    { }

  ngOnInit(): void {
    this.commentService.getAllComments().subscribe(
      (data) => {
        this.commentsList = data;
      }
    )
  }

  hideComments(): void {

    let elem = document.getElementById('comment-section');
    let sect = document.getElementById('commentSectionBlock');
    if (this.commentsVisible==false && elem && sect){
      this.commentsVisible=true
      elem.classList.remove("hide")
      sect.setAttribute("style", "width:300px");
    }else if(this.commentsVisible==true && elem && sect){
      this.commentsVisible=false
      elem.classList.add("hide")
      sect.removeAttribute("style");
    }
  }

  goToProfile(id:string) {
    this.router.navigate([`/profile/${id}`])
    var buttons = document.getElementsByClassName('side-button');
    for (var i = 0; i < buttons.length; ++i) {
      var items = buttons[i];
      items.classList.remove("active");
    }
  }

  goToPost(id:string){
    this.router.navigate([`/post/${id}`])
    var buttons = document.getElementsByClassName('side-button');
    for (var i = 0; i < buttons.length; ++i) {
      var items = buttons[i];
      items.classList.remove("active");
    }
  }
}
