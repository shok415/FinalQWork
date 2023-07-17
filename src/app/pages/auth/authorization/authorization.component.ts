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
  labelReady= false;
  pswReady= false;
  buttonDisabled = true;
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
      id: this.id
    }
    this.http.post<{acess_token:string, id: string}>('http://localhost:5400/user/'+ authUser.login, authUser).subscribe((data) => {
    console.log("data",data)
    authUser.id = data.id;
    this.userService.setUser(authUser);
    var data1 = JSON.stringify(data)
    var t = data1.slice(data1.lastIndexOf('token":"') + 8);
    var token = t.substring(0, t.length-2);
    console.log("data.acess_token",token);
    this.userService.setToken(token);
    window.location.reload()

    //this.router.navigate(['tickets/tickets-list']);

  }, (err: HttpErrorResponse)=> {
    const serverError = <ServerError>err.error;
    console.log(serverError)
    this.messageService.add({severity:'error', summary:serverError.errorText});
  });
}

checkLoginInput() {
  var value = this.login;
  var input = document.getElementById("loginA");
  var loginhelp = document.getElementById("login-helpA");

  if (input && loginhelp) {
    if (value.length < 3) {
      input.classList.remove("ng-valid");
      input.classList.add("ng-invalid");
      loginhelp.classList.remove("hide");
      loginhelp.classList.add("show");
      this.labelReady = false;
      this.checkButtonReady()
    } else {
      input.classList.add("ng-valid");
      input.classList.remove("ng-invalid");
      loginhelp.classList.remove("show");
      loginhelp.classList.add("hide");
      this.labelReady = true;
      this.checkButtonReady()
    }
  }
}

checkButtonReady() {
  if (this.labelReady == true 
    && this.pswReady == true) {
    this.buttonDisabled = false;
  }else{
    this.buttonDisabled = true;
  }
}

checkPasswordInput() {
  var value = this.password;
  var input = document.getElementById("passwordA");
  var passwordhelp = document.getElementById("password-helpA");

  if (input && passwordhelp) {
    if (value.length < 3) {
      input.classList.remove("ng-valid");
      input.classList.add("ng-invalid");
      passwordhelp.classList.remove("hide");
      passwordhelp.classList.add("show");
      this.pswReady = false;
      this.checkButtonReady()
    } else {
      input.classList.add("ng-valid");
      input.classList.remove("ng-invalid");
      passwordhelp.classList.remove("show");
      passwordhelp.classList.add("hide");
      this.pswReady = true;
      this.checkButtonReady()
    }
  }
  
}

} 
