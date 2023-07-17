import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Subscription, debounceTime, filter, fromEvent } from 'rxjs';
import { IUser } from 'src/app/modals/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit{
  items: MenuItem[] = [];
  user!: IUser;
  sideMenuVisible: boolean = true

  ticketSearchValue!: string;
  @ViewChild('ticketSearch') ticketSearch!: ElementRef;
  searchTicketSub!: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }


  ngAfterViewInit(): void {
  }


  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  goToProfile() {
    this.router.navigate([`/profile/${this.user.id}`])
    var buttons = document.getElementsByClassName('side-button');
    for (var i = 0; i < buttons.length; ++i) {
      var item = buttons[i];
      item.classList.remove("active");
    }
  }

  goToSettings(){
    this.router.navigate([`/profile/settings/${this.user.id}`])
    var buttons = document.getElementsByClassName('side-button');
    for (var i = 0; i < buttons.length; ++i) {
      var item = buttons[i];
      item.classList.remove("active");
    }
  }

  goFind() {
    if (this.ticketSearchValue.length>3){
      this.router.navigate([`/search/${this.ticketSearchValue}`])
      var buttons = document.getElementsByClassName('side-button');
      for (var i = 0; i < buttons.length; ++i) {
        var items = buttons[i];
        items.classList.remove("active");
      }
    }
  }

  logOut(){
    this.userService.logOut()
    window.location.href = 'new'
  }

  @Output() menuStyle: any = new EventEmitter()
  hideSideMenu(): void {
    if (this.sideMenuVisible == true) {
      this.menuStyle.emit(false);
      this.sideMenuVisible = false;
    } else {
      this.menuStyle.emit(true);
      this.sideMenuVisible = true;
    }
  }

  
}
