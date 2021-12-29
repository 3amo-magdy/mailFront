import { MailComponent } from './../mail/mail.component';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {
  mail = new MailComponent(this.fileService) /////////////////////////////////
  compose() {
    
    this.mail.to = (<HTMLInputElement>document.getElementById("to")).value
    this.mail.subject = (<HTMLInputElement>document.getElementById("subject")).value
    this.mail.body = (<HTMLInputElement>document.getElementById("body")).value
    this.mail.date = new Date().toDateString()    
    // let mail = new MailComponent(from, to, subject, body, date)
  }


  ngOnInit(): void { }
  // 

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  constructor(private fileService: UploadService) { this.filenames=[]}

  // Use it when send the message
  onUploadFiles(e: Event): void {
    let files = (e.target as HTMLInputElement).files;
    const formData = new FormData();
    if (files) {
      console.log("in upload")
      for (var i = 0; i < files!.length; i++) {
        var file = files[i];
        formData.append('files', file, file.name);
        this.mail.filenames.push(file.name); ///////////////////////////////////////////
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
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
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

  // 
}
