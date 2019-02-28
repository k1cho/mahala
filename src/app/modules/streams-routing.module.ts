import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component';
import { AuthGuard } from '../services/auth.guard';
import { CommentListComponent } from '../components/comments/comment-list/comment-list.component';
import { PeopleListComponent } from '../components/people/people-list/people-list.component';
import { FollowingListComponent } from '../components/following-list/following-list.component';
import { FollowersListComponent } from '../components/followers-list/followers-list.component';
import { NotificationsListComponent } from '../components/notifications-list/notifications-list.component';

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
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StreamsRoutingModule {}
