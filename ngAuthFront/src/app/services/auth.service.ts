import { registerUserModel } from './../register/register.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../login/login.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private _registerUrl = "http://localhost:3000/api/register"
    private _loginUrl = "http://localhost:3000/api/login"


  constructor(private http: HttpClient, private router:Router) {
  
  }
  registerUser(user: registerUserModel): Observable<registerUserModel>{
    return this.http.post<registerUserModel>(this._registerUrl, user)
  }
 

// ...

loginUser(user: UserModel): Observable<UserModel> {
  return this.http.post<UserModel>(this._loginUrl, user).pipe(
    catchError(error => {
      if (error.status === 401) {
        if (error.error === 'Invalid Password') {
          return throwError(() => new Error('Senha inválida. Por favor, tente novamente.'));
        } else if (error.error === 'Invalid email') {
          return throwError(() => new Error('Email inválido. Por favor, verifique o endereço de email informado.'));
        }
      }
      return throwError(() => error);
    })
  );
}

loggedIn(){
  return !!localStorage.getItem('token')
}
logoutUser(){
  localStorage.removeItem('token')
  this.router.navigate(['/'])
}

getToken(){
  return localStorage.getItem('token')
}

}
