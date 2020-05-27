import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from '@shared/services/session-storage.service';
import { Utilisateur } from '@shared/models/entities/utilisateur.entity';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  #sessionUserSubject: BehaviorSubject<Utilisateur>;
  #localUserSubject: BehaviorSubject<Utilisateur>;
  authForm: FormGroup;
  #crtusr = 'currentuser';

  constructor(private router: Router,
              private sessionStrg: SessionStorageService,
              private localStrg: LocalStorageService) {
    this.#sessionUserSubject = new BehaviorSubject<Utilisateur>(this.sessionStrg.get(this.#crtusr));
    this.#localUserSubject = new BehaviorSubject<Utilisateur>(this.localStrg.get(this.#crtusr));
  }

  get sessionUser(): Utilisateur {
    return this.#sessionUserSubject.value;
  }

  set sessionUser(u: Utilisateur) {
    this.sessionStrg.set(this.#crtusr, u);
    this.#sessionUserSubject.next(u);
  }

  get localUser(): Utilisateur {
    return this.#localUserSubject.value;
  }

  set localUser(u: Utilisateur) {
    this.localStrg.set(this.#crtusr, u);
    this.#localUserSubject.next(u);
  }

  disconnect() {
    // remove user from local storage to log user out
    this.sessionStrg.remove(this.#crtusr);
    this.#sessionUserSubject.next(null);
    this.router.navigateByUrl('/auth/login');
  }

}




