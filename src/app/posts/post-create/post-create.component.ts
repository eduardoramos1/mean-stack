import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from './../post.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private id: string;
  private post: Post;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    // verifica se a url mudou
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // verifica se tem o parametro 'id' se tiver, vai tratar componente em modo de edição
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.post = this.postService.getPost(this.id);
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }

  onAddPost(form: NgForm) {
    if (!form.valid) return;
    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content,
    };

    this.postService.addPost(post);
    form.resetForm();
  }
}
