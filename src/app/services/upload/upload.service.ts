import { MailComponent } from './../../Sent/Sent/mail/mail.component';
import { NavigatorComponent } from './../../components/navigator/navigator.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'src/app/app.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private server = 'http://localhost:8080';

  
  constructor(private http: HttpClient) { }
  
  // define function to upload files
  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.server}/file/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  
  // define function to download files
  download(filename: string):Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.server}/file/download/${filename}/`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  sendMessage(message:MailComponent):Observable<Object>{
    return this.http.post(url + `${NavigatorComponent.userID}/compose/send`,{
     "to": message.to,
     "importance": message.importance,
     "subject": message.subject,
     "body": message.body,
     "attach": message.filenames
    },httpOptions);
  }
  //     @PostMapping("/{idStr}/compose/send")
  
  // private apiUrl = "http://localhost:9090";
  // upload(file: File): Observable<HttpEvent<any>> {
    //   const formData: FormData = new FormData();
    
    //   formData.append('file', file);

  //   const req = new HttpRequest('POST', `${this.apiUrl}/upload`, formData, { // make sure of rouing
  //     reportProgress: true,
  //     responseType: 'json'
  //   });

  //   return this.http.request(req);
  // }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/files`); // make sure of rouing
  // }
}
