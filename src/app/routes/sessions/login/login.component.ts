import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  public authForm: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthenticationService,
              private router: Router) {

    this.authForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.auth.currentUser.subscribe(utilz => {
      if (this.auth.currentUserValue.username !== undefined) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  login() {
    this.auth.authenticate(this.authForm.value.username, this.authForm.value.password);
  }

}
