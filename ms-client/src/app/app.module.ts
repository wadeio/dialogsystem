import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AndroidComponent } from './android/android.component';
import { IntentsComponent } from './intents/intents.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EntitiesComponent } from './entities/entities.component';
import { StoryComponent } from './story/story.component';
import { SettingsComponent } from './settings/settings.component';
import { TrainComponent } from './train/train.component';
import { DialogtestComponent } from './dialogtest/dialogtest.component';
import { ApiserviceComponent } from './apiservice/apiservice.component';
import { HttpClientModule }    from '@angular/common/http';
import { TemplatesComponent } from './templates/templates.component';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AndroidComponent,
    IntentsComponent,
    NavbarComponent,
    SidebarComponent,
    EntitiesComponent,
    StoryComponent,
    SettingsComponent,
    TrainComponent,
    DialogtestComponent,
    ApiserviceComponent,
    TemplatesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
