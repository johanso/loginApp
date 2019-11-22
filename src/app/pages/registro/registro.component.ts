import { Component, OnInit } from '@angular/core';
import { UserModel } from './../models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: UserModel;
  reminderMe = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new UserModel();
  }

  onSubmitForm(form: NgForm) {
    if (form.invalid) { return; }
    Swal.fire({
      text: 'Espere por favor...',
      allowOutsideClick: false,
    });
    Swal.showLoading();
    this.auth.register( this.user )
    .subscribe( resp => {
      // console.log(resp);
      Swal.close();
      if ( this.reminderMe ) {
        localStorage.setItem('email', this.user.email);
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
