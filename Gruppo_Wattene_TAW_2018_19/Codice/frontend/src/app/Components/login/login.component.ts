import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../Services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: string;
  password: string;

  constructor(
    private userHttp: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.userHttp.login(this.username, btoa(this.password)).subscribe(
      data => {
        localStorage.setItem('id', data._id);
        // localStorage.setItem('role', data.role);
        this.userHttp.setToken(data.token);
        this.userHttp.setRefreshToken(data.refresh_token);
        this.router.navigate(['dashboard']);
      },
      err => {
        this.openSnackBar('Email o/e password errati!', 2000);
      }
    );
  }

  openSnackBar(message: string, time: number) {
    this.snackBar.open(message, 'chiudi', {
      duration: time,
    });
  }
}
