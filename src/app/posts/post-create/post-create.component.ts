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
  post: Post;
  private mode = 'create';
  private id: string;
  loading: boolean = false;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    // verifica se a url mudou
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // verifica se tem o parametro 'id' se tiver, vai tratar componente em modo de edição
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');

        this.loading = true;
        this.postService.getPost(this.id).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };

          this.loading = false;
        });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (!form.valid) return;

    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content,
    };

    this.loading = true;
    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(
        this.id,
        form.value.title,
        form.value.content
      );
    }
  }
}
