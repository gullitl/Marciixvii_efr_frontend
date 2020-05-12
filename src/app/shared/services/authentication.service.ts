import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable, empty } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from '@shared/services/session-storage.service';
import { Utilisateur } from '@shared/models/entities/utilisateur.entity';
import { UtilisateurService } from './domain/utilisateur.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Utilisateur>;
  public currentUser: Observable<Utilisateur>;

  public authForm: FormGroup;

  constructor(private router: Router, private session: SessionStorageService, private service: UtilisateurService) {
    this.currentUserSubject = new BehaviorSubject<Utilisateur>(this.session.get('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Utilisateur {
    return this.currentUserSubject.value;
  }

  public authenticate(username: string, password: string) {
    this.service.login(username, password)
    .subscribe(u => {
      this.session.set('currentUser', u);
      this.currentUserSubject.next(u);
      this.router.navigateByUrl('/dashboard');
      // this.notificationService.sucess(':: Submitted successfully');
    }, error => {
      console.log('Oops', error);
      // this.notificationService.sucess('::: Error: '.concat(error));
    });
  }

  disconnect() {
    // remove user from local storage to log user out
    this.session.remove('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/auth/login');
  }

}




