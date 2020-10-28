import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from './../post.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private id: string;
  loading: boolean = false;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

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

          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
          });

          this.loading = false;
        });
      } else {
        this.mode = 'create';
        this.id = null;
      }
    });
  }

  onImagePicked(ev: Event) {
    const file = (ev.target as HTMLInputElement).files[0];
    // setValue é para inserir valores em todos os campos do form, patchValue para inserir um unico valor
    this.form.patchValue({ image: file });
    // Checa validade d o que foi feito em patchValue
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) return;

    const post: Post = {
      id: null,
      title: this.form.value.title,
      content: this.form.value.content,
    };

    this.loading = true;
    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postService.updatePost(
        this.id,
        this.form.value.title,
        this.form.value.content
      );
    }
  }
}
