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
  meanwhile = false;

  constructor(private fb: FormBuilder,
              private service: UtilisateurService,
              private auth: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) {

    this.authForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    try {
      if (this.auth.currentUserValue.username !== undefined) {
        this.navigateToDashboard();
      }
    } catch (error) {
      console.log(error);
    }
  }

  login() {
    if(this.authForm.valid) {
      this.meanwhile = true;
      this.service.login({username: this.authForm.value.username,
                          password: this.authForm.value.password
                        })
      .subscribe(u => {
        if(u) {
          this.auth.userSession = u;
          this.navigateToDashboard();
        } else {
          this.notificationService.error('Vos données de connection pourraient être invalides ou incompletes');
          this.meanwhile = false;
        }
      }, error => {
        this.meanwhile = false;
        console.log(error);
        this.notificationService.error(error);
      });
    }
  }

  private navigateToDashboard = () => this.router.navigateByUrl('/dashboard');

}
