import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    //   retorn um objeto que pode ser ouvido
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.posts.push(post);
    // Emite evento para ser escutado por outro valor
    this.postsUpdated.next([...this.posts]);
  }
}
