import { Component, OnInit, Output,EventEmitter, Injector} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { IUser } from 'src/app/modals/user';
import { UserService } from 'src/app/services/user/user.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  items: MenuItem[] = [];
  user!:IUser;
  sideMenuVisible:boolean = true
  constructor(
    private userService: UserService,
    private router: Router,
    public zone: NgZone,
    private injector: Injector
  ) { }
  ngOnInit(): void {

        this.user = this.userService.getUser();
        console.log("!!!!!",this.user)

    this.items = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Update',
                  icon: 'pi pi-refresh'
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-times'
              }
          ]
      },
      {
          label: 'Navigate',
          items: [
              {
                  label: 'Angular',
                  icon: 'pi pi-external-link',
                  url: 'http://angular.io'
              },
              {
                  label: 'Router',
                  icon: 'pi pi-upload',
                  routerLink: '/fileupload'
              }
          ]
      }
  ];
  }
  
  goToProfile(){
    this.router.navigate(['profile'])
  }
  
  goHome(){
    this.router.navigate(['popular'])
  }

  @Output() menuStyle: any = new EventEmitter()
  hideSideMenu(): void {
    if(this.sideMenuVisible == true){
        this.menuStyle.emit(false);
        this.sideMenuVisible = false;
    }else{
        this.menuStyle.emit(true);
        this.sideMenuVisible = true;
    }
  }

}
