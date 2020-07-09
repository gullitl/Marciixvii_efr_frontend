import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Sexe } from '@shared/utils/enums/sexe.enum';
import { UtilisateurService } from '@shared/services/domain/utilisateur.service';
import { NotificationService } from '@shared/services/notification.service';
import { Client } from '@shared/models/entities/client.entity';

@Component({
  selector: 'app-clients-crud',
  templateUrl: './clients-crud.component.html',
})
export class ClientsCrudComponent implements OnInit {
  reactiveForm: FormGroup;
  sexeList: string[] = Object.keys(Sexe).filter(k => typeof Sexe[k as any] === 'number');
  dddList: string[] = ['089', '081', '082', '099'];
  communes: string[] = ['Bandalungwa',
                        'Barumbu',
                        'Bumbu',
                        'Gombe',
                        'Kasa-Vubu',
                        'Kimbanseke',
                        'Kinshasa',
                        'Kintambo',
                        'Kisenso',
                        'Lemba',
                        'Limete',
                        'Lingwala',
                        'Makala',
                        'Maluku',
                        'Masina',
                        'Matete',
                        'Mont-Ngafula',
                        'Ndjili',
                        'Ngaba',
                        'Ngaliema',
                        'Ngiri-Ngiri',
                        'Nsele',
                        'Selembao'
                       ];

  constructor(private fb: FormBuilder,
              private service: UtilisateurService,
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
      adresse: ['', [Validators.required]]
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
