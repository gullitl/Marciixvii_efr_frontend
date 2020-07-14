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
  create = (body: Utilisateur): Observable<Utilisateur> => this.http.post<Utilisateur>(this.url.create(), body, this.#httpOptions);
  update = (body: Utilisateur): Observable<any> => this.http.put<any>(this.url.update(), body, this.#httpOptions);
  changeProfil = (body: any): Observable<any> => this.http.put<any>(this.url.changeProfil(), body, this.#httpOptions);
  changePassword = (body: any): Observable<any> => this.http.put<any>(this.url.changePassword(), body, this.#httpOptions);
  deleteById = (id: number): Observable<Utilisateur> => this.http.delete<Utilisateur>(this.url.deleteById(id), this.#httpOptions);
  login = (body: any): Observable<Utilisateur> => this.http.post<Utilisateur>(this.url.login(), body, this.#httpOptions);
}
