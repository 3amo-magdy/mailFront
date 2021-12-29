import { NavigatorComponent } from './../navigator/navigator.component';
import { MailComponent } from './../mail/mail.component';
import { ProviderService } from './../../services/provider/provider.service';
import { MiniMailComponent } from './../mini-mail/mini-mail.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload/upload.service';
import { ViewerComponent } from '../viewer/viewer.component';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  mails: MiniMailComponent[] = new Array
  filteredMails: MiniMailComponent[] = new Array
  selectedMails: String[] = new Array
  type: String = new String
  filter: boolean = false
  sortBy: string = 'date'
  static mailviewer: ViewerComponent

  constructor(
    private providerService: ProviderService,
    private fileService: UploadService,
    private router: Router) {
        this.providerService.setProviderType(NavigatorComponent.type).subscribe(data => {
        NavigatorComponent.mails = this.providerService.convert(data as Array<any>)
        this.providerService.setProviderMails(NavigatorComponent.mails)
        this.setMails()
        this.router.navigateByUrl('/account/' + this.type)
        this.filter = false

      }
      )
    }
    onFilter(){
      let value =(<HTMLInputElement>document.getElementById("criteria")).value;
      let filter =(<HTMLInputElement>document.getElementById("filter")).value;
      if(value==undefined||filter==undefined){
        this.filter=false;
        return;
      }
      this.providerService.filter(filter,value).subscribe( x =>{ ////////////////////////////////////////
        console.log(x)
        let mails = this.providerService.convert(x as Array<any>)
        this.filteredMails = this.providerService.setProviderMails(mails)
        console.log(this.filteredMails)
        this.filter= !this.filter
      }
      )
    }

    onSort() {
      let sortBy = (<HTMLInputElement>document.getElementById("filter")).value;
      // idStr: string, type: string, criteria: String
      this.providerService.sort(<string>this.type,sortBy).subscribe(data => {
        // this.sortBy = data;
        console.log(this.type)
        console.log("00000000000000000000000")
        console.log(data)
      })
    }
    
  setMails() {
    this.type = this.providerService.type
    this.mails = this.providerService.miniMails
  }

  navigate(mailID: String) {
    console.log(mailID)
    this.providerService.setMail(mailID)
    ProviderComponent.mailviewer = new ViewerComponent(this.providerService, this.fileService, this.router);
  }

  selectMail(mail: MiniMailComponent) {
    this.selectedMails = this.providerService.select(mail.id, this.selectedMails)
  }

  // deleteSelected() {
  //   this.ProviderService.deleteSelected(this.selectedMails)
  //   this.selectedMails = []
  // }


  ngOnInit(): void {}
}


    // let mail = new MailComponent()
    // mail.body = "helloooooooooo"
    // mail.id = "777"
    // console.log(mail.id)
    // console.log(mail.body)
    // let mini_mail: MiniMailComponent = new MiniMailComponent(mail)
    // this.mails.push(mini_mail)
    // this.mails.push(mini_mail)
    // this.mails.push(mini_mail)
    // this.mails.push(mini_mail)
    // this.mails.push(mini_mail)
