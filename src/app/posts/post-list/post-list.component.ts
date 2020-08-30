import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './post-list.component.html',
  selector: 'app-post-list',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  // Permite receber valor de props
  @Input() posts = [];
}
