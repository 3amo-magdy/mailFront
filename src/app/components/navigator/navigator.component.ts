import { MailComponent } from './../mail/mail.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { ProviderComponent } from '../provider/provider.component';
import { UploadService } from 'src/app/services/upload/upload.service';
import { ViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  static userID: String
  static firstname: String
  static lastname: String
  static gender: String
  static email: String
  static userPW: String
  static userFolders: Array<String>
  static logged: boolean = false

  static mails: MailComponent[]
  static type: String
  static provider: ProviderComponent
  static mail: MailComponent

  constructor(
    private http: HttpClient,
    private Router: Router,
    private fileService: UploadService) { }
    providerService: ProviderService = new ProviderService(this.http, this.fileService)

  compose() {
    this.Router.navigateByUrl("/account/compose")
  }

  setProvider(type: String) {
    NavigatorComponent.type = type
    NavigatorComponent.provider = new ProviderComponent(this.providerService, this.fileService, this.Router)
  }
  

  signIn() {
    this.Router.navigateByUrl("/home/signin")
  }

  register() {
    this.Router.navigateByUrl("/home/register")
  }

  visitProfile() {
    this.Router.navigateByUrl("/account")
  }
  
  signOut() {
    NavigatorComponent.userID = new String
    NavigatorComponent.mails = new Array
    NavigatorComponent.logged = false
    this.Router.navigateByUrl("/")
  }

  firstname() {
    return NavigatorComponent.firstname
  }

  getUserFolders() {
    return NavigatorComponent.userFolders
  }

  loggedIn() {
    if(NavigatorComponent.logged) {
      return true;
    } else {
      return false
    }
  }

  ngOnInit(): void {
  }

}
