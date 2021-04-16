import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../Services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  password: string;
  roles = ['cassa', 'cameriere', 'cuoco', 'barista'];
  constructor(
    private http: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.http.register(this.username, this.firstname, this.lastname, this.role.toLowerCase(), btoa(this.password)).subscribe(
      data => {
        this.openSnackBar(data.username + ' con ruolo ' + data.role + ' registrato', 2000);
        this.registerForm.reset();
      },
      err => {
        if (err.status === 304) {
          this.openSnackBar('Utente già registrato', 2000);
        } else if (err.status === 401) {
          this.openSnackBar('Non autorizzato', 2000);
        }
      }
    );
  }

  openSnackBar(message: string, time: number) {
    this.snackBar.open(message, 'chiudi', {
      duration: time,
    });
  }

}
