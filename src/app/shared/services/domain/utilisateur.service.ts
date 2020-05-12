import { Utilisateur } from '@shared/models/entities/utilisateur.entity';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilisateurRestUrl } from '@shared/rest-urls/utilisateur.rest.url';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  #httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient, private url: UtilisateurRestUrl) { }

  getAll = (): Observable<Utilisateur[]> => this.http.get<Utilisateur[]>(this.url.getAll(), this.#httpOptions);
  getById = (id: number): Observable<Utilisateur> => this.http.get<Utilisateur>(this.url.getById(id), this.#httpOptions);
  create = (body: Utilisateur): Observable<Utilisateur> => {
    const test = this.url.create();
    return this.http.post<Utilisateur>(test, body, this.#httpOptions);
  }
  update = (body: Utilisateur): Observable<Utilisateur> => this.http.put<Utilisateur>(this.url.update(), body, this.#httpOptions);
  deleteById = (id: number): Observable<Utilisateur> => this.http.delete<Utilisateur>(this.url.deleteById(id), this.#httpOptions);
  login = (username: string, password: string): Observable<Utilisateur> => this.http.get<Utilisateur>(this.url.login(username, password), this.#httpOptions);
}
