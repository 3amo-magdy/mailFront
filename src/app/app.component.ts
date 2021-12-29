import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

export const url = "http://localhost:8080/mail/"
export const headeroption = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
 constructor() {}
}