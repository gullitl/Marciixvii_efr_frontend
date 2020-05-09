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

  getAllUtilisateurs = (): Observable<Utilisateur[]> => this.http.get<Utilisateur[]>(this.url.getAllUtilisateurs(), this.#httpOptions);
  getUtilisateurById = (id: number): Observable<Utilisateur> => this.http.get<Utilisateur>(this.url.getUtilisateurById(id), this.#httpOptions);
  createUtilisateur = (body: Utilisateur): Observable<Utilisateur> => {
    const test = this.url.createUtilisateur();
    return this.http.post<Utilisateur>(test, body, this.#httpOptions);
  }
  updateUtilisateur = (body: Utilisateur): Observable<Utilisateur> => this.http.put<Utilisateur>(this.url.updateUtilisateur(), body, this.#httpOptions);
  deleteUtilisateurById = (id: number): Observable<Utilisateur> => this.http.delete<Utilisateur>(this.url.deleteUtilisateurById(id), this.#httpOptions);
  login = (username: string, password: string): Observable<Utilisateur> => this.http.get<Utilisateur>(this.url.login(username, password), this.#httpOptions);
}
