import { Injectable } from '@angular/core';
import { BaseRestUrl } from './base.rest.url';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurRestUrl {

  constructor(private baseUrl: BaseRestUrl) {}

  #infixUrl = (postfixUrl: string): string => this.baseUrl.monteUrl('utilisateur/' + postfixUrl);

  getAllUtilisateurs = () => this.#infixUrl('getallutilisateurs');
  getUtilisateurById = (id: number) => this.#infixUrl('getutilisateurbyid/' + id);
  createUtilisateur = () => this.#infixUrl('createutilisateur');
  updateUtilisateur = () => this.#infixUrl('updateutilisateur');
  deleteUtilisateurById = (id: number) => this.#infixUrl('deleteutilisateurbyid/' + id);
  login = (username: string, password: string) => this.#infixUrl('login/' + username + '/' + password);
}
