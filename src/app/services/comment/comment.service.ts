import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/modals/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(body: any):Observable<any>{
    return this.http.post('http://localhost:5400/comment/', body, {headers:{}})
  }

  getListCommentsOfPost(id:string): Observable<IComment[]>{
    return this.http.get<IComment[]>(`http://localhost:5400/comment/post/${id}`);
  }

  getAllComments(): Observable<IComment[]>{
    return this.http.get<IComment[]>('http://localhost:5400/comment/');
  }
}
