import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/modals/user';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ServerError } from 'src/app/modals/error';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  login: string = "";
  password: string = "";
  password_repeat: string = "";
  email: string = "";
  labelReady= false;
  pswReady= false;
  pswRepReady= false;
  buttonDisabled = true;

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  registration(ev: Event): void | boolean {

    const userObj: IUser = {
      password: this.password,
      login: this.login,
      email: this.email
    }

    this.http.post<IUser>('http://localhost:5400/user/', userObj).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Регистрация прошла успешно' });
    }, (err: HttpErrorResponse) => {
      const serverError = <ServerError>err.error;
      this.messageService.add({ severity: 'warn', summary: serverError.errorText });
    });

  }

  checkLoginInput() {
    var value = this.login;
    var input = document.getElementById("login");
    var loginhelp = document.getElementById("login-help");

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

  checkPasswordInput() {
    var value = this.password;
    var input = document.getElementById("password");
    var passwordhelp = document.getElementById("password-help");

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
        

        var repeatValue = this.password_repeat
        var input = document.getElementById("passwordRepeat");
        var repeathelp = document.getElementById("passwordRepeat-help");
    
        if (repeatValue && input && repeathelp) {
            if (repeatValue === value) {
              input.classList.add("ng-valid");
              input.classList.remove("ng-invalid");
              repeathelp.classList.remove("show");
              repeathelp.classList.add("hide");
              this.pswRepReady = true;
              this.checkButtonReady()
            } else {
              input.classList.remove("ng-valid");
              input.classList.add("ng-invalid");
              repeathelp.classList.remove("hide");
              repeathelp.classList.add("show");
              this.labelReady = false;
              this.checkButtonReady()
            }
        }


      }
    }
    this.checkButtonReady()
  }

  checkPasswordRepeat() {
    var value = this.password;
    var repeatValue = this.password_repeat

    var input = document.getElementById("passwordRepeat");
    var repeathelp = document.getElementById("passwordRepeat-help");

    if (repeatValue && input && repeathelp) {
        if (repeatValue === value) {
          input.classList.add("ng-valid");
          input.classList.remove("ng-invalid");
          repeathelp.classList.remove("show");
          repeathelp.classList.add("hide");
          this.pswRepReady = true;
          this.checkButtonReady()
        } else {
          input.classList.remove("ng-valid");
          input.classList.add("ng-invalid");
          repeathelp.classList.remove("hide");
          repeathelp.classList.add("show");
          this.pswRepReady = false;
          this.checkButtonReady()
        }
    }
  }


  checkButtonReady() {
    if (this.labelReady == true 
      && this.pswReady == true 
      && this.pswRepReady == true) {
      this.buttonDisabled = false;
    }else{
      this.buttonDisabled = true;
    }
  }

}
