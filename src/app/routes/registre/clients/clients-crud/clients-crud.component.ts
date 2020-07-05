import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Sexe } from '@shared/utils/enums/sexe.enum';
import { Utilisateur } from '@shared/models/entities/utilisateur.entity';
import { AuthenticationService } from '@shared/services/authentication.service';
import { UtilisateurService } from '@shared/services/domain/utilisateur.service';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-clients-crud',
  templateUrl: './clients-crud.component.html',
})
export class ClientsCrudComponent implements OnInit {
  reactiveForm: FormGroup;
  sexeList: string[] = Object.keys(Sexe).filter(k => typeof Sexe[k as any] === 'number');

  constructor(private fb: FormBuilder,
              private auth: AuthenticationService,
              private service: UtilisateurService,
              private notificationService: NotificationService) {
    this.reactiveForm = this.fb.group({
      nom: [this.auth.sessionUser.nom, [Validators.required]],
      postnom: [this.auth.sessionUser.postnom, [Validators.required]],
      prenom: [this.auth.sessionUser.prenom, [Validators.required]],
      sexe: [this.auth.sessionUser.sexe === Sexe.Masculin ? this.sexeList[0] : this.sexeList[1]],
      email: [this.auth.sessionUser.email, [Validators.required, Validators.email]],
      username: [this.auth.sessionUser.username, [Validators.required]]
    });
  }

  ngOnInit() {}

  onSubmit () {
    if (this.reactiveForm.valid) {
      let sexeValue: number;

      Object.entries(Sexe).filter(([key, value]) => {
        if(value === this.reactiveForm.value.sexe) {
          return sexeValue = Number(key);
        }
      });

      const profil = {
        nom: this.reactiveForm.value.nom,
        postnom: this.reactiveForm.value.postnom,
        prenom: this.reactiveForm.value.prenom,
        sexe: sexeValue,
        email: this.reactiveForm.value.email,
        username: this.reactiveForm.value.username,
        id: this.auth.sessionUser.id
      };
      this.service.changeProfil(profil).subscribe(p => {
        if(p) {
          const u: Utilisateur = {
            nom: profil.nom,
            postnom: profil.postnom,
            prenom: profil.prenom,
            sexe: profil.sexe,
            email: profil.email,
            username: profil.username,
            id: profil.id,
            photosrc: this.auth.sessionUser.photosrc,
            password: this.auth.sessionUser.password,
            niveauAcces: this.auth.sessionUser.niveauAcces
          };
          let doReload = false;
          if(u.username !== this.auth.sessionUser.username) {
            doReload = true;
          }
          this.auth.sessionUser = u;
          this.onClear();
          if(doReload) { location.reload(); }
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
      nom: this.auth.sessionUser.nom,
      postnom: this.auth.sessionUser.postnom,
      prenom: this.auth.sessionUser.prenom,
      sexe: this.auth.sessionUser.sexe === Sexe.Masculin ? this.sexeList[0] : this.sexeList[1],
      email: this.auth.sessionUser.email,
      username: this.auth.sessionUser.username
    });
  }

  getErrorMessage(form: FormGroup) {
    return form.get('email').hasError('required')
      ? 'You must enter a value'
      : form.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }

  isFormInvalid = (): boolean => this.reactiveForm.invalid ? true : this.isTheSame() ?? false;

  isTheSame = (): boolean => {
    let isSexeValueSame: boolean;

    Object.entries(Sexe).filter(([key, value]) => {
      if(value === this.reactiveForm.value.sexe) {
        return isSexeValueSame = Number(key) === this.auth.sessionUser.sexe;
      }
    });

    return this.reactiveForm.value.nom === this.auth.sessionUser.nom &&
            this.reactiveForm.value.postnom === this.auth.sessionUser.postnom &&
            this.reactiveForm.value.prenom === this.auth.sessionUser.prenom &&
            this.reactiveForm.value.username === this.auth.sessionUser.username &&
            this.reactiveForm.value.email === this.auth.sessionUser.email &&
            isSexeValueSame;
  }

}
