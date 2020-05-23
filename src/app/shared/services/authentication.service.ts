import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable, empty } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from '@shared/services/session-storage.service';
import { Utilisateur } from '@shared/models/entities/utilisateur.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  #currentUserSubject: BehaviorSubject<Utilisateur>;
  currentUser: Observable<Utilisateur>;
  authForm: FormGroup;

  constructor(private router: Router, private session: SessionStorageService) {
    this.#currentUserSubject = new BehaviorSubject<Utilisateur>(this.session.get('currentUser'));
    this.currentUser = this.#currentUserSubject.asObservable();
  }

  get currentUserValue(): Utilisateur {
    return this.#currentUserSubject.value;
  }

  set userSession(u: Utilisateur) {
    this.session.set('currentUser', u);
    this.#currentUserSubject.next(u);
  }

  disconnect() {
    // remove user from local storage to log user out
    this.session.remove('currentUser');
    this.#currentUserSubject.next(null);
    this.router.navigateByUrl('/auth/login');
  }

}




