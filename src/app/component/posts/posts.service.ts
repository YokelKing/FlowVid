
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl, HTTP_OPTIONS } from 'src/app/apps/guards/api.url';
import { IPost } from 'src/app/shared/models/posts';


const postUrl = baseUrl + 'Post';
//const userUrl = baseUrl + 'account';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  constructor(private http: HttpClient,
    private router: Router) {     
    }

    getAllPosts(){
      return this.http.get<IPost[]>(postUrl);
    }

    getPostById(id){
      return this.http.get<IPost>(`${postUrl}/${id}`);
    }

    createPost(data){
      return this.http.post<IPost>(postUrl, data);
    }

    updatePost(id, data){
      return this.http.put<IPost>(`${postUrl}/${id}`, data);
    }

    deletePost(data){
      return this.http.delete(`${postUrl}/${data.id}`);
    }
}
