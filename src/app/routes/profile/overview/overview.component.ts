import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Sexe } from '@shared/utils/enums/sexe.enum';
import { Utilisateur } from '@shared/models/entities/utilisateur.entity';
import { AuthenticationService } from '@shared/services/authentication.service';
import { UtilisateurService } from '@shared/services/domain/utilisateur.service';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './overview.component.html',
})
export class ProfileOverviewComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthenticationService,
              private service: UtilisateurService) {
    this.reactiveForm = this.fb.group({
      nom: [this.auth.currentUserValue.nom, [Validators.required]],
      postnom: [this.auth.currentUserValue.postnom, [Validators.required]],
      prenom: [this.auth.currentUserValue.prenom, [Validators.required]],
      sexe: [this.auth.currentUserValue.sexe === Sexe.Masculin ? '1' : '2'],
      email: [this.auth.currentUserValue.email, [Validators.required, Validators.email]],
      username: [this.auth.currentUserValue.username, [Validators.required]]
    });
  }

  ngOnInit() {}

  onSubmit = () => {
    if (this.reactiveForm.valid) {
      const utilisateur: Utilisateur = {
        nom: this.reactiveForm.value.nom,
        postnom: this.reactiveForm.value.postnom,
        prenom: this.reactiveForm.value.prenom,
        sexe: this.reactiveForm.value.sexe,
        email: this.reactiveForm.value.email,
        username: this.reactiveForm.value.username,
        id: this.auth.currentUserValue.id,
        photosrc: '',
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
}
