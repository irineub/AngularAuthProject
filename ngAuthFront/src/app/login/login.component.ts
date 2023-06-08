import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

export interface UserModel {
  email: string | null;
  password: string | null;
  token?:any
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  momentForm!: FormGroup

  loginUserData: UserModel = {
    email: '',
    password: '',
    token: ''
  };
  errorMessage: string = '';

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])

    })
  }
  get email(){
    return this.momentForm.get('email')!;
  }
  get password(){
    return this.momentForm.get('password')!;
  }

  constructor(private Auth: AuthService, private router:Router) {}

  loginUser() {
    if (this.momentForm.invalid) {
      return;
    }

    this.Auth.loginUser(this.loginUserData).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', response.token)
        this.router.navigate(['/special']);


      },
      error: (error) => {
        console.error(error);
        if (
          error.message ===
          'Email inválido. Por favor, verifique o endereço de email informado.'
        ) {
          this.errorMessage = error.message;
        } else if (
          error.message === 'Senha inválida. Por favor, tente novamente.'
        ) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage =
            'Ocorreu um erro durante o login. Por favor, tente novamente mais tarde.';
        }

        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      },
    });
  }
}
