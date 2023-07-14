import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/modals/post';
import { IUser } from 'src/app/modals/user';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, AfterViewInit{
  postList!: IPost[];
  constructor(private postService: PostService,
    private userService:UserService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
     let url = window.location.href;
    // if (url.indexOf("new") >= 0){ 
      this.postService.getAllPosts().subscribe(
        (data) => {
             data.sort(function(a,b){
                  var a1:any = new Date(a.createTime)
                  var b2:any = new Date(b.createTime)
                  if (a1-b2>0){
                    return -1
                  }else{
                    return 1
                  }
            });
            this.postList = data;
        }
      )
    //}


    // if (url.indexOf("popular") >= 0){
    // this.postService.getAllPosts().subscribe(
    //   (data) => {
    //        data.sort(function(a,b){
    //             var a1:any = new Date(a.createTime)
    //             var b2:any = new Date(b.createTime)
    //             if (a1-b2>0){
    //               return -1
    //             }else{
    //               return 1
    //             }
    //       });
    //       this.postList = data;
    //   }
    // )
    // }

    if (url.indexOf("bookmark") >= 0){
    this.postService.getAllPosts().subscribe(
      (data) => {
          var listOfBooks = this.userService.getUser().bookmarks
          var mass = [];
          var list = data;
          if(listOfBooks)
          for (var j=0; j<listOfBooks?.length; j++){
            var id = listOfBooks[j]
            for (var i in list){
              if (list[i]._id == id){
                mass.push(list[i])
              }
            }
          }
          this.postList = mass;
      }
    )
    }

    if (url.indexOf("search") >= 0){ 
      const routeIdParam = this.route.snapshot.paramMap.get('text');
      const queryIdParam = this.route.snapshot.queryParamMap.get('text');
  
      const paramValueId = routeIdParam || queryIdParam;
      if(paramValueId){
        this.postService.getAllPosts().subscribe(
          (data) => {
            var mass = [];
              var list = data;
              for (var i in list){
                if (list[i].title.toLowerCase().indexOf(paramValueId.toLowerCase()) >= 0){
                  mass.push(list[i])
                }
              }
              this.postList = mass;
          }
        )
      }
    }
  }

  goToPost(item: IPost){
    this.router.navigate([`/post/${item._id}`])
    var buttons = document.getElementsByClassName('side-button');
    for (var i = 0; i < buttons.length; ++i) {
      var items = buttons[i];
      items.classList.remove("active");
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

  addToBookmark(item:IPost){
    let usrId = this.userService.getUser().id
    var body = 
    {"userId":usrId,
     "postId":item._id
    }
    this.http.post<any>('http://localhost:5400/user/bookmark/', body).subscribe((data) => {
      console.log(data)
    });
    this.http.get<any>(`http://localhost:5400/user/${usrId}`).subscribe((data) => {
      const authUser: IUser ={
        login: "",
        id: "",
        bookmarks: []
      }
      authUser.id = data.id;
      authUser.login = data.login;
      authUser.bookmarks = data.bookmarks;
      this.userService.setUser(authUser);
    });
  }

}
