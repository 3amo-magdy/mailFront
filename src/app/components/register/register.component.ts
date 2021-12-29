import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private AccountService: AccountService,
    private Router: Router) { }

  strength = 0
  validations = new Array()
  showPassword: boolean = false
  passwordType: String = "password"

  register() {
    let account = new AccountComponent(this.AccountService, this.Router)
    account.firstName = (<HTMLInputElement>document.getElementById("firstname")).value
    account.lastName = (<HTMLInputElement>document.getElementById("lastname")).value
    account.emailAddress = (<HTMLInputElement>document.getElementById("email")).value
    account.gender = (<HTMLInputElement>document.getElementById("gender")).value
    account.password = (<HTMLInputElement>document.getElementById("password")).value
    console.log(account.gender);
    console.log(account);

    this.AccountService.addAccount(account).subscribe(data => {
      console.log("data received from back :\n" + data);
      if ((<String>data).includes("missing")) {
        alert("Missing Info!")
      }
      else if ((<String>data).includes("taken")) {
        alert("Please choose another username")
      }
      else {
        alert("Successfully Created!")
        this.Router.navigateByUrl("/")
      }
    })
  }

  signIn() {
    this.Router.navigateByUrl("/home/signin")
  }

  validate(input: any) {
    const password = input.target.value
    this.validations = [
      (password.length > 8),
      (password.search(/[A-Z]/) > -1),
      (password.search(/[0-9]/) > -1),
      (password.search(/[!@#$%^&*+=_-]/) > -1)
    ]
    this.strength = this.validations.reduce((acc, cur) => acc + cur)
  }

  toggle() {
    if (!this.showPassword) {
      this.showPassword = true;
      this.passwordType = "text"
    } else {
      this.showPassword = false;
      this.passwordType = "password"
    }
  }

  ngOnInit(): void { }

}
