import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component';
import { AuthGuard } from '../services/auth.guard';
import { CommentListComponent } from '../components/comments/comment-list/comment-list.component';
import { PeopleListComponent } from '../components/people/people-list/people-list.component';
import { FollowingListComponent } from '../components/following-list/following-list.component';
import { FollowersListComponent } from '../components/followers-list/followers-list.component';
import { NotificationsListComponent } from '../components/notifications-list/notifications-list.component';
import { ChatComponent } from '../components/chat/chat/chat.component';
import { ImageListComponent } from '../components/images/image-list/image-list.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';

const routes: Routes = [
  {
    path: 'streams',
    component: StreamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component: CommentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    component: PeopleListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'following',
    component: FollowingListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'followers',
    component: FollowersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:username',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'images/:username',
    component: ImageListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':username',
    component: ViewUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'streams'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StreamsRoutingModule {}
