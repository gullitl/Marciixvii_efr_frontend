import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable, empty } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Sexe } from '@shared/utils/enums/sexe.enum';
import { NiveauAcces } from '@shared/utils/enums/niveau-acces.enum';
import { SessionStorageService } from '@shared/services/session-storage.service';
import { Utilisateur } from '@shared/models/entities/utilisateur.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Utilisateur>;
  public currentUser: Observable<Utilisateur>;

  public authForm: FormGroup;

  constructor(private router: Router, private session: SessionStorageService) {
    this.currentUserSubject = new BehaviorSubject<Utilisateur>(this.session.get('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Utilisateur {
    return this.currentUserSubject.value;
  }

  public authenticate(username: string, password: string) {
    const utilisateur = {
      id: 1,
      nom: 'Luzolo',
      postnom: 'Lusembo',
      prenom: 'Plamedi',
      sexe: Sexe.Masculin,
      photosrc: 'assets/images/avatar.jpg',
      email: 'plam.l@live.fr',
      username,
      password,
      niveauAcces: NiveauAcces.Administrateur,
      token: 'fghjjbfkjsbjkbkjabvsbakjb578628489jbkjd'
    };

    this.session.set('currentUser', utilisateur);
    this.currentUserSubject.next(utilisateur);
    this.router.navigateByUrl('/dashboard');
  }

  disconnect() {
    // remove user from local storage to log user out
    this.session.remove('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/auth/login');
  }

}




