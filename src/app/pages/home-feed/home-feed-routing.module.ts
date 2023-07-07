import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeFeedComponent } from './home-feed.component';
import { PostListComponent } from '../post-list/post-list.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeFeedComponent,
    children: [
      {
        path: 'popular',
        component: PostListComponent, 
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      
      // {
      //   path: 'profile',
      //   loadChildren: ()=> import('../profile/profile.module').then(m => m.ProfileModule)
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeFeedRoutingModule { }
