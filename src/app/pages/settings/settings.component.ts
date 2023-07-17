import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServerError } from 'src/app/modals/error';
import { IUser } from 'src/app/modals/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  user!:IUser
  currentPsw!: string;
  newPsw!: string;
  newPswRepeat!: string;
  constructor(private route: ActivatedRoute,
    private userService:UserService,
    private http: HttpClient,
    private messageService: MessageService) { }

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
  }


  changePsw(ev: Event): void {
    let usrId = this.userService.getUser().id
    var body =
    {
      "userId": usrId,
      "oldPsw": this.currentPsw,
      "newPsw": this.newPsw,
      "newPswRepeat":this.newPswRepeat
    }

    this.http.post<IUser>('http://localhost:5400/user/changepsw/', body).subscribe((data) => {
      this.messageService.add({ severity: 'success', summary: 'Пароль успешно изменен' });
    }, (err: HttpErrorResponse) => {
      const serverError = <ServerError>err.error;
      this.messageService.add({ severity: 'warn', summary: serverError.errorText });
    });
  }

}
