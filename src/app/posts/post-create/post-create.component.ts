import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
})
export class PostCreateComponent {
  newPost = 'SEM CONTEÚDO';

  onAddPost() {
    this.newPost = 'O post do usuário';
  }
}
