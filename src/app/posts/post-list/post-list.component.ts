import { PostService } from './../post.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from './../post.model';

import { Subscription } from 'rxjs';

@Component({
  templateUrl: './post-list.component.html',
  selector: 'app-post-list',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // Permite receber valor de props
  posts: Post[] = [];

  // Permite que o observable desapareça quando o componente deixar de existir, se não o observarble sempre estará ativo. Criando uma memory leak
  private postsSub: Subscription;

  constructor(public postService: PostService) {
    postService;
  }

  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
