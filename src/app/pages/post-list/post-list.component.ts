import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ServerError } from 'src/app/modals/error';
import { IPost } from 'src/app/modals/post';
import { IUser } from 'src/app/modals/user';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, AfterViewInit {
  postList!: IPost[];
  bookList!: any
  constructor(private postService: PostService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    let url = window.location.href;
    // if (url.indexOf("new") >= 0){ 
    this.postService.getAllPosts().subscribe(
      (data) => {
        data.sort(function (a, b) {
          var a1: any = new Date(a.createTime)
          var b2: any = new Date(b.createTime)
          if (a1 - b2 > 0) {
            return -1
          } else {
            return 1
          }
        });
        this.postList = data;
      }
    )
    //}

    if (url.indexOf("bookmark") >= 0) {
      var userId = this.userService.getUser().id
      if (userId) {
        this.userService.getUserBooks(userId).subscribe(
          (data) => {
            this.bookList = data;
            if (this.bookList) {
              this.postService.getBookMarksPosts(this.bookList).subscribe(
                (data) => {
                  this.postList = data;
                }
              )
            }

          }
        )
      }
    }

    if (url.indexOf("search") >= 0) {
      const routeIdParam = this.route.snapshot.paramMap.get('text');
      const queryIdParam = this.route.snapshot.queryParamMap.get('text');

      const paramValueId = routeIdParam || queryIdParam;
      if (paramValueId) {
        this.postService.getAllPosts().subscribe(
          (data) => {
            var mass = [];
            var list = data;
            for (var i in list) {
              if (list[i].title.toLowerCase().indexOf(paramValueId.toLowerCase()) >= 0) {
                mass.push(list[i])
              }
            }
            this.postList = mass;
          }
        )
      }
    }
  }

  goToPost(item: IPost) {
    this.router.navigate([`/post/${item._id}`])
    var buttons = document.getElementsByClassName('side-button');
    for (var i = 0; i < buttons.length; ++i) {
      var items = buttons[i];
      items.classList.remove("active");
    }
  }

  goToProfile(id: string) {
    this.router.navigate([`/profile/${id}`])
    var buttons = document.getElementsByClassName('side-button');
    for (var i = 0; i < buttons.length; ++i) {
      var items = buttons[i];
      items.classList.remove("active");
    }
  }

  addToBookmark(item: IPost) {
    let url = window.location.href;
    let usrId = this.userService.getUser().id
    var body =
    {
      "userId": usrId,
      "postId": item._id
    }
    this.http.post<any>('http://localhost:5400/user/bookmark/', body).subscribe((data) => {
      if (usrId) {
        this.userService.getSpecificUser(usrId).subscribe((data2) => {
          console.log(data2)
          if (data2.bookmarks) {
            if (data2.bookmarks.indexOf(item._id) < 0) {
              this.messageService.add({ severity: 'warn', summary: 'Публикация удалена из закладок' });
              if (url.indexOf("bookmark") >= 0) {
                var userId = this.userService.getUser().id
                if (userId) {
                  this.userService.getUserBooks(userId).subscribe(
                    (data) => {
                      this.bookList = data;
                      if (this.bookList) {
                        this.postService.getBookMarksPosts(this.bookList).subscribe(
                          (data) => {
                            this.postList = data;
                          }
                        )
                      }

                    }
                  )
                }
              }
            } else {
              this.messageService.add({ severity: 'success', summary: 'Публикация добавлена в закладку' });
              if (url.indexOf("bookmark") >= 0) {
                var userId = this.userService.getUser().id
                if (userId) {
                  this.userService.getUserBooks(userId).subscribe(
                    (data) => {
                      this.bookList = data;
                      if (this.bookList) {
                        this.postService.getBookMarksPosts(this.bookList).subscribe(
                          (data) => {
                            this.postList = data;
                          }
                        )
                      }
                    }
                  )
                }
              }
            }
          }

        });
      }
    });


  }

}
