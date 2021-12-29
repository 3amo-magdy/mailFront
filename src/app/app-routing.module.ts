import { MailComponent } from './Sent/Sent/mail/mail.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { ProviderComponent } from './components/provider/provider.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposerComponent } from './components/composer/composer.component';
import { SigninComponent } from './components/signin/signin.component';
import { ViewerComponent } from './components/viewer/viewer.component';
const routes: Routes = [
  {path: "account", component: AccountComponent},
  {path: "account/edit", component: EditAccountComponent},
  {path: "account/compose", component: ComposerComponent},
  {path: "account/inbox", component: ProviderComponent},
  {path: "account/draft", component: ProviderComponent},
  {path: "account/sent", component: ProviderComponent},
  {path: "account/trash", component: ProviderComponent},
  {path: "account/folder", component: ProviderComponent},
  {path: "account/mail", component: ViewerComponent},
  {path: "home/signin", component: SigninComponent},
  {path: "home/register", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [
  EditAccountComponent,
  ProviderComponent,
  ViewerComponent,
  MailComponent,
  SigninComponent,
  RegisterComponent,
  AccountComponent,
  ComposerComponent
]
