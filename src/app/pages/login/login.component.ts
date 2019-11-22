import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from './../models/user.model';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  reminderMe = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if ( localStorage.getItem('email') || localStorage.getItem('password') ) {
      this.user.email = localStorage.getItem('email');
      this.user.password = localStorage.getItem('password');
      this.reminderMe = true;
    }
  }

  onSubmitForm(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      text: 'Espere por favor...',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.auth.login( this.user )
      .subscribe( resp => {
        // console.log( resp );
        Swal.close();

        if ( this.reminderMe ) {
          localStorage.setItem('email', this.user.email);
          localStorage.setItem('password', this.user.password);
        }

        this.router.navigateByUrl('/home');
      }, (err) => {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: err.error.error.message,
        });
      });

  }

}
