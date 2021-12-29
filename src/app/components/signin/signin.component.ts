import { AccountService } from 'src/app/services/account/account.service';
import { NavigatorComponent } from './../navigator/navigator.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private AccountService: AccountService,
    private router: Router
  ) {  }

  showPassword: boolean = false
  passwordType: String = "password"

  validate() {
    let email = (<HTMLInputElement>document.getElementById("emailInput")).value
    let password = (<HTMLInputElement>document.getElementById("passwordInput")).value     //GOT EMAIL AND PASSWORD READY TO VALIDATE
    this.AccountService.validate(email, password).subscribe(
      data => {
        if(data) {
          NavigatorComponent.email = email
          NavigatorComponent.userPW = password
          this.processData(data as Array<any>)
          this.router.navigateByUrl('/account')
        } else {
          alert("Invalid User Info!")
        }
      }
    )
  }

  processData(data: any[]) {
    NavigatorComponent.userID = data[0]
    NavigatorComponent.firstname = data[1]
    NavigatorComponent.lastname = data[2]
    NavigatorComponent.gender = data[3]
    NavigatorComponent.userFolders = data[4] as Array<String>
    NavigatorComponent.logged = true
  }

  toggle() {
    if(!this.showPassword) {
      this.showPassword = true;
      this.passwordType = "text"
    } else {
      this.showPassword = false;
      this.passwordType ="password"
    }
  }

  ngOnInit(): void {
  }

}
