import { Component, EventEmitter, Output } from '@angular/core';
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

  // para criar um evento de emissao
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(form: NgForm) {
    if (!form.valid) return;
    const post: Post = {
      title: form.value.title,
      content: form.value.content,
    };

    // Emite um evento para um componenente que esteja em listening
    this.postCreated.emit(post);
  }
}
