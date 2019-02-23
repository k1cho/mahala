import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { PostFormComponent } from '../components/posts/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts/posts.component';
import { PostService } from '../services/post.service';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CommentListComponent } from '../components/comments/comment-list/comment-list.component';
import { CommentService } from '../services/comment.service';
import { RouterModule } from '@angular/router';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SideBarComponent,
    PostFormComponent,
    PostsComponent,
    CommentListComponent
  ],
  imports: [CommonModule, FormsModule, SocketIoModule.forRoot(config), RouterModule],
  exports: [StreamsComponent, ToolbarComponent],
  providers: [TokenService, PostService, CommentService]
})
export class StreamsModule {}
