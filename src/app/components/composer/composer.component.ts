import { NavigatorComponent } from './../navigator/navigator.component';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { UploadService } from 'src/app/services/upload/upload.service';
import { MailComponent } from './../../Sent/Sent/mail/mail.component';

@Component({
  selector: 'app-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {

  compose() {
    // let from = (<HTMLInputElement> document.getElementById("from")).value
    this.mail.to = (<HTMLInputElement> document.getElementById("to")).value
    this.mail.subject = (<HTMLInputElement> document.getElementById("subject")).value
    this.mail.body = (<HTMLInputElement> document.getElementById("body")).value
    console.log(this.mail)
    this.fileService.sendMessage(this.mail).subscribe(x=>(
      console.log(x)
      
    ))
  }

  logged() {
    return NavigatorComponent.logged
  }

  //  THE COMPOSER WILL BE RESPONSIBLE FOR EDITING DRAFTED MESSAGES
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  constructor(private fileService: UploadService) {
    this.mail = new MailComponent(this.fileService)
  }

  mail: MailComponent

  // Use it when send the message
  onUploadFiles(e: Event): void {
    let files = (e.target as HTMLInputElement).files;
    const formData = new FormData();
    if (files) {
      console.log("in upload")
      for (var i = 0; i < files!.length; i++) {
        var file = files[i];
        formData.append('files', file, file.name);
        this.mail.filenames.push(file.name);
      }
      this.fileService.upload(formData).subscribe(
        event => {
          console.log(event);
          this.resportProgress(event);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
      console.log("Success")
    }
    else { console.log("Error! Select File") }
    console.log("hi")
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  ngOnInit(): void {}
}
