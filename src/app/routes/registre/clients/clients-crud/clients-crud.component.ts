import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Sexe } from '@shared/utils/enums/sexe.enum';
import { UtilisateurService } from '@shared/services/domain/utilisateur.service';
import { NotificationService } from '@shared/services/notification.service';
import { Client } from '@shared/models/entities/client.entity';
import { Ddd } from '@shared/utils/enums/ddd.enum';
import { Commune } from '@shared/utils/enums/commune.enum';
import { GlobalVariableService } from '@shared/services/global-variable.service';

@Component({
  selector: 'app-clients-crud',
  templateUrl: './clients-crud.component.html',
})
export class ClientsCrudComponent implements OnInit {
  reactiveForm: FormGroup;
  sexeList: string[] = Object.keys(Sexe).filter(k => typeof Sexe[k as any] === 'number');
  dddList: string[] = Object.keys(Ddd).filter(k => typeof Ddd[k as any] === 'number');
  communes: string[] = Object.keys(Commune).filter(k => typeof Commune[k as any] === 'number');
  isEditionMode: boolean;

  constructor(private fb: FormBuilder,
              private service: UtilisateurService,
              private globalVariable: GlobalVariableService,
              private notificationService: NotificationService) {
    this.reactiveForm = this.fb.group({
      id: [0],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      sexe: [this.sexeList[0]],
      ddd: [this.dddList[1]],
      nrTelephone: ['', [Validators.required]],
      photosrc: [''],
      avenue: [''],
      nrAdresse: [''],
      quartier: [''],
      commune: [this.communes[16]],
    });

    this.isEditionMode = this.globalVariable.isEditionModeVGClientsCrudComponent === undefined ?? false;

  }

  ngOnInit() {}

  photosrc = () => 'assets/images/avatar.jpg';


  onSubmit () {
    if (this.reactiveForm.valid) {
      let sexeValue: number;

      Object.entries(Sexe).filter(([key, value]) => {
        if(value === this.reactiveForm.value.sexe) {
          return sexeValue = Number(key);
        }
      });

      const client = {
        nom: this.reactiveForm.value.nom,
        prenom: this.reactiveForm.value.prenom,
        sexe: sexeValue,
        nrTelephone: this.reactiveForm.value.nrTelephone,
        photosrc: this.reactiveForm.value.photosrc,
        adresse: this.reactiveForm.value.adresse,
        id: this.reactiveForm.value.id
      };
      this.service.changeProfil(client).subscribe(p => {
        if(p) {
          const u: Client = {
            id: client.id,
            nom: client.nom,
            prenom: client.prenom,
            sexe: client.sexe,
            nrTelephone: client.nrTelephone,
            photosrc: client.photosrc,
            adresse: client.adresse
          };
          let doReload = false;
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
      id: [0],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      sexe: [this.sexeList[0]],
      ddd: [this.dddList[1]],
      nrTelephone: ['', [Validators.required]],
      photosrc: [''],
      avenue: [''],
      nrAdresse: [''],
      quartier: [''],
      commune: [this.communes[16]],
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
    if(this.isEditionMode) {
      // let isSexeValueSame: boolean;
      // let isDddValueSame: boolean;
      // let isCommuneValueSame: boolean;

      // Object.entries(Sexe).filter(([key, value]) => {
      //   if(value === this.reactiveForm.value.sexe) {
      //     return isSexeValueSame = Number(key) === this.auth.sessionUser.sexe;
      //   }
      // });

      // return this.reactiveForm.value.nom === this.auth.sessionUser.nom &&
      //         this.reactiveForm.value.postnom === this.auth.sessionUser.postnom &&
      //         this.reactiveForm.value.prenom === this.auth.sessionUser.prenom &&
      //         this.reactiveForm.value.username === this.auth.sessionUser.username &&
      //         this.reactiveForm.value.email === this.auth.sessionUser.email &&
      //         isSexeValueSame;
    } else {
      let isSexeValueSame: boolean;
      let isDddValueSame: boolean;
      let isCommuneValueSame: boolean;

      Object.entries(Sexe).filter(([key, value]) => {
        if(value === this.reactiveForm.value.sexe) {
          return isSexeValueSame = Number(key) === 1;
        }
      });

      Object.entries(Ddd).filter(([key, value]) => {
        if(value === this.reactiveForm.value.ddd) {
          return isDddValueSame = Number(key) === 2;
        }
      });

      Object.entries(Commune).filter(([key, value]) => {
        if(value === this.reactiveForm.value.commune) {
          return isCommuneValueSame = Number(key) === 17;
        }
      });

      return this.reactiveForm.value.prenom === '' &&
             this.reactiveForm.value.nom === '' &&
              this.reactiveForm.value.nrTelephone === '' &&
              this.reactiveForm.value.avenue === '' &&
              (this.reactiveForm.value.nrAdresse === '' || this.reactiveForm.value.nrAdresse === 0) &&
              this.reactiveForm.value.quartier === '' &&
              isSexeValueSame &&
              isDddValueSame &&
              isCommuneValueSame;
    }

  }

}
