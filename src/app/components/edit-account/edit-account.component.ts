import { NavigatorComponent } from './../navigator/navigator.component';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { AccountComponent } from 'src/app/components/account/account.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  constructor(
    private AccountService: AccountService,
    private Router: Router
  ) { }

  firstname() {
    return NavigatorComponent.firstname
  }
  lastname() {
    return NavigatorComponent.lastname
  }
  gender() {
    return NavigatorComponent.gender
  }
  email() {
    return NavigatorComponent.email
  }
  password() {
    return NavigatorComponent.userPW
  }

  strength = 0
  validations = new Array()
  showPassword: boolean = false
  passwordType: String = "password"

  edit() {
    let account = new AccountComponent(this.AccountService, this.Router)
    account.firstName = (<HTMLInputElement>document.getElementById("firstname")).value
    account.lastName = (<HTMLInputElement>document.getElementById("lastname")).value
    account.emailAddress = (<HTMLInputElement>document.getElementById("email")).value
    account.gender = (<HTMLInputElement>document.getElementById("gender")).value
    account.password = (<HTMLInputElement>document.getElementById("password")).value
    this.AccountService.addAccount(account).subscribe(data => {
      console.log("data received from back :\n" + data);
      if ((<String>data).includes("missing")) {
        alert("Missing Info!")
      }
      else if ((<String>data).includes("taken")) {
        alert("Please choose another username")
      }
      else {
        alert("Successfully Edited!")
        this.Router.navigateByUrl("/account")
      }
    })
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

  logged() {
    return NavigatorComponent.logged
  }

  ngOnInit(): void {
  }

}
