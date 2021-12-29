import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountComponent } from 'src/app/components/account/account.component';
import { url } from 'src/app/app.component';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT"
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = "http://localhost:8080/mail"; // 'http://localhost:8080/accounts'

  constructor(private http: HttpClient) { }

  validate(email: string, password: string) {
    let params = new HttpParams()
    .set('email', email)
    .set('password', password)
    console.log("login/" + params.toString())          // MAKING SURE IT GOT THE CORRECT REQUEST
    return this.http.get<any[]>(url + "login/", {params})
  }

  getAccount(): Observable<AccountComponent> {
    return this.http.get<AccountComponent>(this.apiUrl);
  }

  deleteAccount(account: AccountComponent): Observable<AccountComponent> {
    const url = `${this.apiUrl}/${account.userID}`;
    return this.http.delete<AccountComponent>(url);
  }

  addAccount(account: AccountComponent): Observable<Object> {//this returns just the id 
    return this.http.post(this.apiUrl + "/signup", {
      "firstName": account.firstName,
      "lastName": account.lastName,
      "email": account.emailAddress,
      "password": account.password,
    }, httpOptions);
  }
  editAccount(account: AccountComponent): Observable<Object> {
    return this.http.post(this.apiUrl + `/${account.userID}/editAccount`, {
      "firstName": account.firstName,
      "lastName": account.lastName,
      "gender":account.gender,
      "email": account.emailAddress,
      "password": account.password,
    }, httpOptions);
  }
}
