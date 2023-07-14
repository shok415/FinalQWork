import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/modals/comment';
import { IPost } from 'src/app/modals/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(body: any):Observable<any>{
      return this.http.post('http://localhost:5400/post/', body, {headers:{}})
  }

  getAllPosts(): Observable<IPost[]>{
    return this.http.get<IPost[]>('http://localhost:5400/post/');
  }

  getSpecificPost(id:string): Observable<IPost>{
    return this.http.get<IPost>(`http://localhost:5400/post/${id}`);
  }

  getUsersPost(id:string): Observable<IPost[]>{
    return this.http.get<IPost[]>(`http://localhost:5400/post/user/${id}`);
  }
}
