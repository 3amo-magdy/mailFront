import { httpOptions } from './../account/account.service';
import { NavigatorComponent } from './../../components/navigator/navigator.component';
import { url } from './../../app.component';
import { MiniMailComponent } from './../../components/mini-mail/mini-mail.component';
import { MailComponent } from './../../components/mail/mail.component';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UploadService } from '../upload/upload.service';

@Injectable({
  providedIn: 'root'
})

export class ProviderService {
  
  miniMails: MiniMailComponent[] = []
  type: String = ""

  constructor(
    private http: HttpClient,
    private fileService: UploadService) {}

  setProviderType(type: String) {
    this.type = type
    return this.http.get(url + NavigatorComponent.userID + "/" + type);
  }

  convert(data: Array<any>) {
    let mailsArray = new Array
    let from: String
    let to: String 
    let subject: String
    let body: String
    let date: String
    let id: String
    let priority: String
    let attachments = [];
    console.log(data)
    for(let i = 0; i < data.length; i++) {
      from = data[i].from
      to = data[i].to
      subject = data[i].subject
      body = data[i].body
      date = data[i].dateTime
      id = data[i].id
      priority = data[i].importance
  
      // attachments = data[i].attach  
      console.log(data[i].attach.type)
      for(let j=0;j<data[i].attach.length;j++) {
        attachments.push(data[i].attach[j])
        console.log("attachments")
      }      console.log(attachments)
      let mail = new MailComponent(this.fileService, to, subject, body, id, from, priority, date, attachments)
      console.log(mail)
      mailsArray.push(mail)
    }
    return mailsArray
  }

  setProviderMails(mails: MailComponent[]) {
    let miniMails = []
    for(let i = 0; i < mails.length; i++) {
      let miniMail = new MiniMailComponent(mails[i])
      miniMails.push(miniMail)
    }
    this.miniMails = miniMails
    return miniMails
  }

  setMail(mailID: String) {
    for(let i = 0; i < NavigatorComponent.mails.length; i++) {
      if(mailID === NavigatorComponent.mails[i].id) {
        let from = NavigatorComponent.mails[i].from
        let to = NavigatorComponent.mails[i].to
        let subject = NavigatorComponent.mails[i].subject
        let body = NavigatorComponent.mails[i].body
        let date = NavigatorComponent.mails[i].date
        let id = NavigatorComponent.mails[i].id
        let priority = NavigatorComponent.mails[i].importance
        let attachments = NavigatorComponent.mails[i].filenames
        NavigatorComponent.mail = new MailComponent(this.fileService, to, subject, body, id, from, priority, id, attachments)
        console.log(NavigatorComponent.mail)
      }
    }
  }

  select(id: String, selected: String[]) {
    selected.push(id)
    return selected
  }
  
  deleteSelected(selected: Array<String>) { 
    return this.http.post(url+NavigatorComponent.userID + "/" + this.type + "/Mdelete", selected, httpOptions);
  }

  sort(type: string, criteria: string) {
    console.log(type)
    return this.http.get(url + NavigatorComponent.userID + "/" + type + "/sort/" + criteria);
    // {idStr}/{group}/sort/{bywhat}
  }
  // search(for: String){
  //   return this.http.get(url + NavigatorComponent.userID + "/" + this.type+"/search/" + by);
  //   //GetMapping("{idStr}/{group}/search/{text}")
  // }
  filter(criteria: String, value: string){
    let params = new HttpParams().set("value", value);
    return this.http.get(url + NavigatorComponent.userID + "/" + this.type+ "/filter/" + criteria , {params} );
    //GetMapping("/{idStr}/{Group}/filter/{criteria}/{to}")
  }
  filterTo(criteria: String, value: string, to: String) {
    let params = new HttpParams().set("value", value);
    return this.http.get(url + NavigatorComponent.userID + "/" + this.type+ "/filter/" + criteria + "/" + to, {params} );
    //GetMapping("/{idStr}/{Group}/filter/{criteria}/{to}")
  }
  copy(selected: Array<String>,to:String){
    return this.http.post(url+NavigatorComponent.userID + "/" + this.type + "/" + "copyto" + "/" + to ,selected,httpOptions);
    // @PostMapping("/{idStr}/{A}/copyto/{B}")
  }
  //     @GetMapping("/{idStr}/{group}/{idm}/setImportance/{imp}")
  setImportance(mailID:String,imp:String){
    return this.http.get(url + NavigatorComponent.userID + "/" + this.type+"/"+mailID+"/"+"setImportance"+"/"+imp);
  }
  
}
