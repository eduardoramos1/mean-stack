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
  totalPosts: number = 0;
  postsPerPage: number = 2;
  currentPage: number = 1;
  pageSizeOptions: number[] = [1, 2, 5, 10, 25];

  // Permite que o observable desapareça quando o componente deixar de existir, se não o observarble sempre estará ativo. Criando uma memory leak
  private postsSub: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts(this.postsPerPage, this.currentPage);

    this.loading = true;
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
        this.loading = false;
      });
  }

  onDelete(id: string) {
    this.loading = true;
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.loading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
