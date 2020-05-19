import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Sexe } from '@shared/utils/enums/sexe.enum';
import { AuthenticationService } from '@shared/services/authentication.service';
import { UtilisateurService } from '@shared/services/domain/utilisateur.service';
import { Utilisateur } from '@shared/models/entities/utilisateur.entity';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './settings.component.html',
})
export class ProfileSettingsComponent implements OnInit {
  reactiveForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
    private auth: AuthenticationService,
    private service: UtilisateurService) {
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

  onSubmit = () => {
    if (this.reactiveForm.valid) {
      const utilisateur: Utilisateur = {
        nom: this.reactiveForm.value.nom,
        postnom: this.reactiveForm.value.postnom,
        prenom: this.reactiveForm.value.prenom,
        sexe: this.reactiveForm.value.sexe,
        photosrc: '',
        email: this.reactiveForm.value.email,
        username: this.reactiveForm.value.username,
        id: this.auth.currentUserValue.id,
        password: this.auth.currentUserValue.password,
        niveauAcces: this.auth.currentUserValue.niveauAcces
      };

      this.service.update(utilisateur).subscribe(p => {
        this.onClear();
        // this.notificationService.sucess(':: Submitted successfully');
      }, error => {
        console.log('Oops', error);
        // this.notificationService.sucess('::: Error: '.concat(error));
      });
    }
  }

  onClear() {
    this.reactiveForm.reset();
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.reactiveForm.setValue({
      id: 0,
      nom: '',
      postnom: '',
      prenom: '',
      sexe: Sexe.Masculin,
      photosrc: '',
      email: '',
      username: '',
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
