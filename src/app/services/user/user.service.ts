import { Injectable } from '@angular/core';
import { IUser } from 'src/app/modals/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: IUser;
  loggedIn: boolean | undefined;
  token!:string | null;

  constructor() { }

  getUser(): IUser { 
    let userD = window.localStorage.getItem('userData');
    let userData = []
    if(userD){
      userData = JSON.parse(userD)
    }
    return userData;
  };
   
   setUser(user: IUser) {
    if(user.id){
      user.password = "";
      window.localStorage.setItem('userData', JSON.stringify(user))
    }
    return this.user = user;
   };

   setToken(token:string):void{
    this.token = token;
    window.localStorage.setItem('user_token', JSON.stringify(token))
   }

   
  //  getToken(): string { 
  //     if(this.token){
  //       return this.token;
  //     }else{
  //       let token: any = window.localStorage.getItem('user_token');
  //       return token;
  //     }
  //  };
  //  removeToken(): void{
  //   this.token = null;
  //   window.localStorage.removeItem('user_token');
  //  }
  //  setToStore(token: string) {  window.localStorage.setItem('userToken', token);}


}
