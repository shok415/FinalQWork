import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { HomeFeedRoutingModule } from './home-feed-routing.module';
import { HomeFeedComponent } from './home-feed.component';
import { HeaderComponent } from '../header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { AsideComponent } from '../aside/aside.component';
import { MenuModule } from 'primeng/menu';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AuthComponent } from '../auth/auth.component';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import { AuthorizationComponent } from '../auth/authorization/authorization.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    HomeFeedComponent,
    HeaderComponent,
    AsideComponent,
    AuthComponent,
    AuthorizationComponent,
    RegistrationComponent
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
    ToastModule
  ],
  providers:[
    MessageService]
})
export class HomeFeedModule { }
