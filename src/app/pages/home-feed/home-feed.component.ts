import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { PostItemComponent } from '../post-item/post-item.component';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.css']
})
export class HomeFeedComponent implements OnInit, OnChanges{
  sideMenuVisible:boolean = true;
  items: MenuItem[] = [];
  sideitems: MenuItem[] = [];
  @Input() menuType: any;
  post!: FormGroup
  comment!: FormGroup
  file:string = ""
  search!:string
  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService:CommentService
  ) { }

  getEmit(ev:any): any {
    this.sideMenuVisible = ev;
    let elem = document.getElementById('asideMenu');
    if (this.sideMenuVisible==false && elem){
      elem.classList.add("hide")
    }else if(this.sideMenuVisible==true && elem){
      elem.classList.remove("hide")
    }
  }

  ngOnInit(): void {
    let url = window.location.href;

    if (url.indexOf("new") >= 0){ 
      var button = document.getElementById("new");
      if (button) {
          button.classList.add("active");
      }
    }

    if (url.indexOf("bookmark") >= 0){ 
      var button = document.getElementById("bookmark");
      if (button) {
          button.classList.add("active");
      }
    }
    
    this.post = new FormGroup({
      title: new FormControl('',[Validators.required, Validators.minLength(3)]),
      body: new FormControl(),
      img: new FormControl()
       
    })

    this.comment = new FormGroup({
      text: new FormControl('',[Validators.required, Validators.minLength(3)])
    })
  }

  ngOnChanges(ev: SimpleChanges): void {
  }

  createPost():void{
    const postDataRaw = this.post.getRawValue();
    let formParams = new FormData();
    if(typeof postDataRaw === 'object'){
      for(let prop in postDataRaw){
        formParams.append(prop, postDataRaw[prop])
      }
    }
    if(this.file){
      formParams.append('img', this.file);
    }
    
    var user = this.userService.getUser()
    if (user.id){
      formParams.append("authorId", user.id)
    }
    if (user.login){
      formParams.append("authorLogin", user.login)
    }
    let d = new Date()
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    formParams.append("createTimeLabel", datestring)
    formParams.append("rating", "0")
    formParams.append("createTime", d.toISOString())
    this.postService.createPost(formParams).subscribe(()=> {})
    //window.location.reload()
  }

  selectFile(ev:any):void{
    if (ev.target.files.length>0){
      this.file =  ev.target.files[0];
    }
  }

  createComment():void{
    const postDataRaw = this.comment.getRawValue();
    let formParams = new FormData();
    if(typeof postDataRaw === 'object'){
      for(let prop in postDataRaw){
        formParams.append(prop, postDataRaw[prop])
      }
    }
    var user = this.userService.getUser()
    if (user.id){
      formParams.append("authorId", user.id)
    }
    if (user.login){
      formParams.append("authorLogin", user.login)
    }
    let postD = window.localStorage.getItem('thisPost');
    let postData = []
    if(postD){
      postData = JSON.parse(postD)
    }
    if (postData._id){
      formParams.append("postId", postData._id)
    }
    if (postData.title){
      formParams.append("postTitle", postData.title)
    }
    let d = new Date()
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    formParams.append("createTimeLabel", datestring)
    
    this.commentService.createComment(formParams).subscribe(()=> {})
    window.location.reload()
  }

}
