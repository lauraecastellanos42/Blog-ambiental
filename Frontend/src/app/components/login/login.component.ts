import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(8),
        ],
      ],
    });
  }

  ngOnInit(): void {}
  ingresar() {
    console.log(this.formLogin.value);
    this.errorSnackBar();
    this.successSnackBar();
    this.fakeLoading();
  }

  errorSnackBar() {
    this._snackBar.open('Credenciales incorrectas', 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }

  successSnackBar() {
    this._snackBar.open('Bienvenido', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['dashboard']);
    }, 3000);
  }
}
