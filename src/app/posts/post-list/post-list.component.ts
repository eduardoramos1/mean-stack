import { PostService } from './../post.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from './../post.model';

import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  templateUrl: './post-list.component.html',
  selector: 'app-post-list',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // Permite receber valor de props
  posts: Post[] = [];
  loading: boolean = false;
  totalPosts: number = 10;
  postsPerPage: number = 2;
  pageSizeOptions: number[] = [1, 2, 5, 10, 25];

  // Permite que o observable desapareça quando o componente deixar de existir, se não o observarble sempre estará ativo. Criando uma memory leak
  private postsSub: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts();

    this.loading = true;
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.loading = false;
      });
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
