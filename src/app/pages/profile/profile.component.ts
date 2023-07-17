import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IPost } from 'src/app/modals/post';
import { IUser } from 'src/app/modals/user';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  constructor(private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private userService:UserService,
    private http: HttpClient,
    private messageService: MessageService) { }
  user!:IUser
  user1 = {}
  userLogin!:string
  postsList!:IPost[]
  ngOnInit(): void {
    
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;
    if(paramValueId){
    this.userService.getSpecificUser(paramValueId).subscribe(
      (data) => {
           this.user = data;
      }
    )
    }
    if (paramValueId) {
      this.postService.getUsersPost(paramValueId).subscribe(
        (data) => {
          this.postsList = data;
          console.log(data)
        }
      )
    }


  }

  goToPost(item: IPost){
    console.log(item._id)
    this.router.navigate([`/post/${item._id}`])
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
            } else {
              this.messageService.add({ severity: 'success', summary: 'Публикация добавлена в закладку' });
            }
          }

        });
      }
    });
  }

}
