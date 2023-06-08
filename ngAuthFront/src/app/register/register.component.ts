import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';

export interface registerUserModel {
  name: string | null
  email: string | null
  password: string | null
  token?: any
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  momentForm!: FormGroup

  registerUserData:registerUserModel = {
    name: "",
    email: "",
    password: "",
    token: ""
  }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])

    })
  }

  get name(){
    return this.momentForm.get('name')!;
  }
  get email(){
    return this.momentForm.get('email')!;
  }
  get password(){
    return this.momentForm.get('password')!;
  }

  constructor(private Auth: AuthService, private router: Router){}

  registerUser() {
    if (this.momentForm.invalid) {
      return;
    }
  
    this.Auth.registerUser(this.registerUserData).subscribe({
  next:(response) => {
        console.log('Registro do usuário bem-sucedido:', response);
        localStorage.setItem('token', response.token)
        this.router.navigate(['/special']);
      },
      error: (error)=>{
        console.error(error);

      }
    
    
    }

    );
  }
  


}
