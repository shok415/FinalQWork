import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private userService:UserService) { }
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


}
