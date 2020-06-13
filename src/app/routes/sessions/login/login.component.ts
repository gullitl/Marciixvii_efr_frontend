import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@shared/services/authentication.service';
import { UtilisateurService } from '@shared/services/domain/utilisateur.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  doYourememberMe: boolean;
  meanwhile = false;

  constructor(private fb: FormBuilder,
              private service: UtilisateurService,
              private auth: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) {
  try {
    this.doYourememberMe = this.auth.localUser.username !== undefined && this.auth.localUser.password !== undefined;
  } catch (error) {
    this.doYourememberMe = false;
    console.log(error);
  }
    this.authForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [this.doYourememberMe]
    });
  }

  ngOnInit() {
    try {
      if (this.auth.sessionUser.username !== undefined) {
        this.navigateToDashboard();
        return;
      }
    } catch (error) {
      console.log(error);
    }
    if (this.doYourememberMe) {
      this.authForm.controls.username.setValue(this.auth.localUser.username);
      this.authForm.controls.password.setValue(this.auth.localUser.password);
    }
  }

  login() {
    if(this.authForm.valid) {
      this.meanwhile = true;
      let mawatrop = true;
      this.service.login({username: this.authForm.value.username, password: this.authForm.value.password})
        .subscribe(u => {
          if(u) {
            this.auth.sessionUser = u;
            this.auth.localUser = this.authForm.value.rememberMe ? u : null;
            this.navigateToDashboard();
          } else {
            this.notificationService.error('Vos données de connection pourraient être invalides ou incompletes');
            this.meanwhile = false;
          }
          mawatrop = false;
        }, error => {
          this.meanwhile = false;
          mawatrop = false;
          console.log(error);
          this.notificationService.error(error);
        }, () => {
          if(mawatrop) {
            this.meanwhile = false;
            console.log('Mawa trop');
            this.notificationService.error('Mawa trop');
          }
        });
    }
  }

  private navigateToDashboard = () => this.router.navigateByUrl('/dashboard');

}
