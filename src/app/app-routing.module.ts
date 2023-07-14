import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()  => import('./pages/home-feed/home-feed.module').then(m => m.HomeFeedModule)
  },
//   { path: '',
//   redirectTo: ''
//  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
