import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UtilisateurService } from '@shared/services/domain/utilisateur.service';
import { Utilisateur } from '@shared/models/entities/utilisateur.entity';
import { Sexe } from '@shared/utils/enums/sexe.enum';
import { NiveauAcces } from '@shared/utils/enums/niveau-acces.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private service: UtilisateurService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]],
    });
  }

  ngOnInit() {}

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  onSubmit = () => {
    if (this.registerForm.valid) {
      let test: any;

      const utilisateur: Utilisateur = {
        id: 0,
        nom: 'Luzolo',
        postnom: 'Lusembo',
        prenom: 'Plamedi',
        sexe: Sexe.Masculin,
        photosrc: '',
        email: 'plam.l@live.fr',
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        niveauAcces: NiveauAcces.Administrateur
      };

      this.service.createUtilisateur(utilisateur)
      .subscribe(p => {
        test = p;
        console.log(test);
        this.onClear();
        // this.notificationService.sucess(':: Submitted successfully');
      }, error => {
        console.log('Oops', error);
        // this.notificationService.sucess('::: Error: '.concat(error));
      });
    }
  }

  onClear = () => {
    this.registerForm.reset();
    this.initializeFormGroup();
  }

  initializeFormGroup = () => {
    this.registerForm.setValue({
      id: 0,
      nom: '',
      postnom: '',
      prenom: '',
      sexe: Sexe.Masculin,
      photosrc: '',
      email: '',
      username: '',
      password: '',
      niveauAcces: NiveauAcces.Administrateur
    });
  }

}
