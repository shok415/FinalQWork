import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { HomeFeedRoutingModule } from './home-feed-routing.module';
import { HomeFeedComponent } from './home-feed.component';
import { HeaderComponent } from '../header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { AsideComponent } from '../aside/aside.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AuthComponent } from '../auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import { AuthorizationComponent } from '../auth/authorization/authorization.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PostListModule } from '../post-list/post-list.module';
import { ProfileModule } from '../profile/profile.module';
import { PostItemModule } from '../post-item/post-item.module';
import { CommentSectionComponent } from '../comment-section/comment-section.component';
import { SettingsModule } from '../settings/settings.module';

@NgModule({
  declarations: [
    HomeFeedComponent,
    HeaderComponent,
    AsideComponent,
    AuthComponent,
    AuthorizationComponent,
    RegistrationComponent,
    CommentSectionComponent
  ],
  imports: [
    CommonModule,
    HomeFeedRoutingModule,
    MenubarModule,
    InputTextModule,
    MenuModule,
    ButtonModule,
    TabViewModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextareaModule,
    PostListModule,
    ProfileModule,
    PostItemModule,
    SettingsModule
  ],
  providers:[
    MessageService]
})
export class HomeFeedModule { }
