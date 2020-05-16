import { Injectable } from '@angular/core';
import { BaseRestUrl } from './base.rest.url';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurRestUrl {

  constructor(private baseUrl: BaseRestUrl) {}

  #infixUrl = (postfixUrl: string): string => this.baseUrl.monteUrl('utilisateur/' + postfixUrl);

  getAll = () => this.#infixUrl('getall');
  getById = (id: number) => this.#infixUrl('getbyid?id=' + id);
  create = () => this.#infixUrl('create');
  update = () => this.#infixUrl('update');
  deleteById = (id: number) => this.#infixUrl('deletebyid?id=' + id);
  login = (username: string, password: string) => this.#infixUrl('login?username=' + username + '&password=' + password);
}
