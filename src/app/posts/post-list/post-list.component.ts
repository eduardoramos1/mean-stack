import { PostService } from './../post.service';
import { Component, Input } from '@angular/core';
import { Post } from './../post.model';

@Component({
  templateUrl: './post-list.component.html',
  selector: 'app-post-list',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  // Permite receber valor de props
  @Input() posts: Post[] = [];

  constructor(public postService: PostService) {
    postService;
  }
}
