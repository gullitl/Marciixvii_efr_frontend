import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';
import { AuthenticationService } from '@shared/services/authentication.service';
import { UtilisateurService } from '@shared/services/domain/utilisateur.service';
import { Utilisateur } from '@shared/models/entities/utilisateur.entity';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  reactiveForm: FormGroup;
  hidecp = true;
  hidenp = true;

  constructor(private fb: FormBuilder,
    private auth: AuthenticationService,
    private service: UtilisateurService,
    private notificationService: NotificationService) {
    this.reactiveForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', this.newPasswordValidator],
      confirmNewPassword: ['', [this.confirmValidator]]
    });
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.reactiveForm.controls.newPassword.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  newPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value === this.reactiveForm.controls.currentPassword.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  ngOnInit() {}

  private validForm(): boolean {
    let allright = true;
    let errMsg: string;
    let elementById: string;

    if (this.reactiveForm.invalid) {
      errMsg = ':: Same thing went wrong';
      allright = false;
    }

    if(this.reactiveForm.value.currentPassword !== this.auth.currentUserValue.password) {
      errMsg = ':: Current Password is wrong';
      elementById = 'crtpwd';
      allright = false;
    }

    if(this.reactiveForm.value.currentPassword === this.reactiveForm.value.newPassword) {
      errMsg = ':: Password remains the same';
      elementById = 'newpwd';
      allright = false;
    }
    if(this.reactiveForm.value.newPassword !== this.reactiveForm.value.confirmNewPassword) {
      errMsg = ':: Password is inconsistent';
      elementById = 'cfmpwd';
      allright = false;
    }

    if (!allright) {
      this.notificationService.error(errMsg);
      if(elementById) {(document.getElementById(elementById) as HTMLInputElement).select();}
      return false;
    }
    return true;
  }

  onSubmit = (formDirective: FormGroupDirective) => {
    if(this.validForm()) {
      const newPassword = {
        password: this.reactiveForm.value.newPassword,
        id: this.auth.currentUserValue.id
      };
      this.service.changePassword(newPassword).subscribe(p => {
        if(p) {
          const u: Utilisateur = {
            nom: this.auth.currentUserValue.nom,
            postnom: this.auth.currentUserValue.postnom,
            prenom: this.auth.currentUserValue.prenom,
            sexe: this.auth.currentUserValue.sexe,
            email: this.auth.currentUserValue.email,
            username: this.auth.currentUserValue.username,
            id: newPassword.id,
            photosrc: this.auth.currentUserValue.photosrc,
            password: newPassword.password,
            niveauAcces: this.auth.currentUserValue.niveauAcces
          };
          this.auth.userSession = u;
          this.onClear();
          formDirective.resetForm();
          this.notificationService.sucess(':: Submitted successfully');
        } else {
          this.notificationService.error('Une erreur est parvenue lors du update');
        }
      }, error => {
        this.notificationService.error(error);
      });
    }
  }

  onClear() {
    this.reactiveForm.reset();
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.reactiveForm.setValue({
      currentPassword: ' ',
      newPassword: '  ',
      confirmNewPassword: '  '
    });
  }

  getErrorMessage(form: FormGroup) {
    return form.get('email').hasError('required')
      ? 'You must enter a value'
      : form.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }

  isTheSame = (): boolean => this.reactiveForm.value.currentPassword === '' ||
                            this.reactiveForm.value.newPassword === '' ||
                            this.reactiveForm.value.confirmNewPassword === '';

}
