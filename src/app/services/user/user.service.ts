import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/modals/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: IUser;
  loggedIn: boolean | undefined;
  token!:string | null;

  constructor(private http: HttpClient) { }

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
      delete user.password;
      window.localStorage.setItem('userData', JSON.stringify(user))
    }
    return this.user = user;
   };

   setToken(token:string):void{
    this.token = token;
    window.localStorage.setItem('user_token', JSON.stringify(token))
   }

   getSpecificUser(id:string): Observable<IUser>{
    return this.http.get<IUser>(`http://localhost:5400/user/${id}`);
  }

   logOut():void{
    window.localStorage.removeItem('user_token')
    window.localStorage.removeItem('userData')
   }
}
