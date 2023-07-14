import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    TabViewModule
  ]
})
export class ProfileModule { }
