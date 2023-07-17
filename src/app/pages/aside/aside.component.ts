import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  sideitems: MenuItem[] = [];
  sideMenuVisible: any
  user!:any
  constructor(
    private router: Router,
    private userService:UserService
  ) { }
  @Input() menuType: any;
  ngOnInit(): void {
    this.user = this.userService.getUser()
    if (!this.user.id){
      var button = document.getElementById("bookmark");
      if (button) {
        button.classList.add("hide");
      }
    }
  } 

  goPopular() {
    this.router.navigate(['popular'])
    var buttons = document.getElementsByClassName('side-button');
    for (var i = 0; i < buttons.length; ++i) {
      var items = buttons[i];
      items.classList.remove("active");
    }
    var button = document.getElementById("popular");
    if (button) {
      button.classList.add("active");
    }
  }

  goNew() {
    this.router.navigate(['new'])
    var buttons = document.getElementsByClassName('side-button');
    for (var i = 0; i < buttons.length; ++i) {
      var items = buttons[i];
      items.classList.remove("active");
    }
    var button = document.getElementById("new");
    if (button) {
      button.classList.add("active");
    }
  }

  gobookmarks(){
    this.router.navigate(['bookmark'])
    var buttons = document.getElementsByClassName('side-button');
    for (var i = 0; i < buttons.length; ++i) {
      var items = buttons[i];
      items.classList.remove("active");
    }
    var button = document.getElementById("bookmark");
    if (button) {
      button.classList.add("active");
    }
  }
}
