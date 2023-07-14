import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/app/modals/comment';
import { IPost } from 'src/app/modals/post';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  commentCount!: number
  post!: IPost
  commentsList!: IComment[];

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private commentService:CommentService,
    private http: HttpClient) { }

  ngOnInit(): void {
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      this.postService.getSpecificPost(paramValueId).subscribe(
        (data) => {
          this.post = data;
          window.localStorage.setItem('thisPost', JSON.stringify(data))
        }
      )
    }
    if (paramValueId) {
    this.commentService.getListCommentsOfPost(paramValueId).subscribe(
      (data) => {
        this.commentsList = data;
        this.commentCount = data.length;
      }
    )
    }
  }
}
