import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { UtilisateurService } from '@shared/services/domain/utilisateur.service';
import { NotificationService } from '@shared/services/notification.service';
import { UtilisateurNewPassword } from '@shared/models/dtos/utilisateur-new-password.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  reactiveForm: FormGroup;
  meanwhile = false;

  constructor(private fb: FormBuilder,
              private service: UtilisateurService,
              private router: Router,
              private notificationService: NotificationService) {
    this.reactiveForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]],
      token: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.reactiveForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  onSubmit(formDirective: FormGroupDirective) {
    if(this.reactiveForm.valid) {
      this.meanwhile = true;
      const newPassword: UtilisateurNewPassword = {
        password: this.reactiveForm.value.password,
        username: this.reactiveForm.value.username,
        token: this.reactiveForm.value.token
      };
      this.service.changePassword(newPassword).subscribe(p => {
        if(p) {
          this.onClear();
          formDirective.resetForm();
          this.navigateToLogin();
          this.notificationService.sucess(':: Submitted successfully');
        } else {
          this.meanwhile = false;
          this.notificationService.error('Une erreur est parvenue lors du update');
        }
      }, error => {
        this.meanwhile = false;
        this.notificationService.error(error);
      });
    }
  }

  onClear = () => {
    this.reactiveForm.reset();
    this.initializeFormGroup();
  }

  initializeFormGroup = () => {
    this.reactiveForm.setValue({
      username: '',
      password: '',
      confirmPassword: '',
      token: ''
    });
  }

  private navigateToLogin = () => this.router.navigateByUrl('/auth/login');

}
