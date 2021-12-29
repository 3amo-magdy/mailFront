import { AccountComponent } from './components/account/account.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MailComponent } from './components/mail/mail.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { ComposerComponent } from './components/composer/composer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MiniMailComponent } from './components/mini-mail/mini-mail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProviderComponent } from './components/provider/provider.component';
import { AddfolderComponent } from './components/addfolder/addfolder.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { ViewerComponent } from './components/viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    MailComponent,
    SigninComponent,
    AccountComponent,
    RegisterComponent,
    ComposerComponent,
    MiniMailComponent,
    ProviderComponent,
    AddfolderComponent,
    EditAccountComponent,
    NavigatorComponent,
    ViewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
