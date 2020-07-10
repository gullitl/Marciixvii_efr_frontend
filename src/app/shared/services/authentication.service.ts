import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  #crtusr = 'currentuser';

  constructor(private router: Router,
              private sessionStorage: SessionStorageService,
              private localStorage: LocalStorageService) {
    this.#sessionUserSubject = new BehaviorSubject<Utilisateur>(this.sessionStorage.get(this.#crtusr));
    this.#localUserSubject = new BehaviorSubject<Utilisateur>(this.localStorage.get(this.#crtusr));
  }

  get sessionUser(): Utilisateur {
    return this.#sessionUserSubject.value;
  }

  set sessionUser(u: Utilisateur) {
    this.sessionStorage.set(this.#crtusr, u);
    this.#sessionUserSubject.next(u);
  }

  get localUser(): Utilisateur {
    return this.#localUserSubject.value;
  }

  set localUser(u: Utilisateur) {
    this.localStorage.set(this.#crtusr, u);
    this.#localUserSubject.next(u);
  }

  disconnect() {
    // remove user from local storage to log user out
    this.sessionStorage.remove(this.#crtusr);
    this.#sessionUserSubject.next(null);
    this.router.navigateByUrl('/auth/login');
  }

}




