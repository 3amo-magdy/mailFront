import { AccountService } from 'src/app/services/account/account.service';
import { Router } from '@angular/router';
import { NavigatorComponent } from './../navigator/navigator.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private Router: Router
  ) { 
    this.password = NavigatorComponent.userPW
    this.firstName = NavigatorComponent.firstname
    this.lastName = NavigatorComponent.lastname
    this.gender = NavigatorComponent.gender
    this.emailAddress = NavigatorComponent.email
    this.userID = NavigatorComponent.userID
  }

  password: String
  firstName: String
  lastName: String
  gender: String
  profilePicture?: String
  emailAddress: String
  userID: String

  //TO-DO: IMPLEMENT HOW A USER CAN VIEW EDIT THEIR ACCOUNT AND SEND AND REQUEST DATA ACCORDINGLY
  edit() {
    if(NavigatorComponent.logged){
      this.Router.navigateByUrl("account/edit")
    }
  }

  logged() {
    return NavigatorComponent.logged
  }

  ngOnInit(): void {}

}
