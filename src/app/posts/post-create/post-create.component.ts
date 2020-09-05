import { PostService } from './../post.service';
import { Component } from '@angular/core';
import { Post } from './../post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  constructor(public postService: PostService) {}

  onAddPost(form: NgForm) {
    if (!form.valid) return;
    const post: Post = {
      title: form.value.title,
      content: form.value.content,
    };

    this.postService.addPost(post);
    form.resetForm();
  }
}
