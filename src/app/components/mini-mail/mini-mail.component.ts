import { MailComponent } from './../mail/mail.component';
import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-mini-mail',
  templateUrl: './mini-mail.component.html',
  styleUrls: ['./mini-mail.component.css']
})

export class MiniMailComponent implements OnInit {

  subSubject: String
  name: String
  id: String
  prioritized?: number
  selected?: boolean
  date?: String

  constructor(MailComponent: MailComponent) {
    if(MailComponent.subject.length > 60) {
      this.subSubject = MailComponent.subject.substring(0, 60) + "..."
    } else {
      this.subSubject = MailComponent.subject
    }
    this.name = "noreply"
    this.id = MailComponent.id
    this.selected = false
    this.date = MailComponent.date
  }

  select() {
    this.selected = !this.selected
    console.warn(this.id + ": selected")
  }

  ngOnInit(): void {}
}
