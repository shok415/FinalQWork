import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IPost } from 'src/app/modals/post';
import { IUser } from 'src/app/modals/user';
import { UserService } from 'src/app/services/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  user: IUser | undefined;
  

  post = new FormGroup({
    title: new FormControl('',[Validators.required, Validators.minLength(3)]),
    id: new FormControl(),
    body: new FormControl(),
    authorID: new FormControl(),
    rating: new FormControl(),
    img: new FormControl(),
  })


  // post = {
  //   id:"",
  //   title:"",
  //   imgTitle:"",
  //   body:"",
  //   authorID:"",
  //   rating: 0
  // }

  constructor(
    private userService: UserService
  ) { }

  getEmit(ev:any): any {
    this.sideMenuVisible = ev;
    console.log("typeMenu",this.sideMenuVisible)
    let elem = document.getElementById('asideMenu');
    if (this.sideMenuVisible==false && elem){
      elem.classList.add("hide")
    }else if(this.sideMenuVisible==true && elem){
      elem.classList.remove("hide")
    }
  }
  
  ngOnInit(): void {
    this.items = []
    this.sideitems = [
        {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
        },
        {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
        }
    ];
  }

  ngOnChanges(ev: SimpleChanges): void {
    this.sideMenuVisible = this.menuType
    console.log("typeMenu",this.sideMenuVisible)

  }
}
