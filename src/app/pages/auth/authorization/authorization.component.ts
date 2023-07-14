import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/modals/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {MessageService} from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';
import { ServerError } from 'src/app/modals/error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  password: string = "";
  login: string= "";
  id:string= "";
  bookmarks:Array<any> = []
  email:string= "";

  ngOnInit(): void {
    
  }

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private router: Router,
    private http:HttpClient) { }

  onAuth(ev: Event):void{
    const authUser: IUser ={
      password: this.password,
      login: this.login,
      id: this.id,
      bookmarks:this.bookmarks
    }
    this.http.post<{acess_token:string, id: string, bookmarks:any}>('http://localhost:5400/user/'+ authUser.login, authUser).subscribe((data) => {
    console.log("data",data)
    authUser.id = data.id;
    authUser.bookmarks = data.bookmarks;
    this.userService.setUser(authUser);
    var data1 = JSON.stringify(data)
    var t = data1.slice(data1.lastIndexOf('token":"') + 8);
    var token = t.substring(0, t.length-2);
    console.log("data.acess_token",token);
    this.userService.setToken(token);
    //window.location.reload()

    //this.router.navigate(['tickets/tickets-list']);

  }, (err: HttpErrorResponse)=> {
    const serverError = <ServerError>err.error;
    console.log(serverError)
    this.messageService.add({severity:'error', summary:serverError.errorText});
  });
}
} 
