import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    ToastModule
  ]
})
export class PostListModule { }
