import { AppPage } from './../../../e2e/src/app.po';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject, Subscriber } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map((res) => {
          return {
            posts: res.posts.map((post) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
              };
            }),
            maxPosts: res.maxPosts,
          };
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.posts = res.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: res.maxPosts,
        });
      });
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
    }>('http://localhost:3000/api/posts/' + id);
  }

  getPostUpdateListener() {
    //   retorn um objeto que pode ser ouvido
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((res) => {
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id,
        title,
        content,
        imagePath: image,
      } as Post;
    }

    this.http
      .put(`http://localhost:3000/api/posts/${id}`, postData)
      .subscribe((res) => {
        this.router.navigate(['/']);
      });
  }

  deletePost(id: string) {
    return this.http.delete(`http://localhost:3000/api/posts/${id}`);
  }
}
