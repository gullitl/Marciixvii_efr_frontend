import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Sexe } from '@shared/utils/enums/sexe.enum';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './overview.component.html',
})
export class ProfileOverviewComponent implements OnInit {
  reactiveForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      id: [0],
      nom: ['', [Validators.required]],
      postnom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      sexe: [Sexe.Masculin],
      photosrc: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  getErrorMessage(form: FormGroup) {
    return form.get('email').hasError('required')
      ? 'You must enter a value'
      : form.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
