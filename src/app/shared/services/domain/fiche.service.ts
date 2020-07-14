import { Fiche } from '@shared/models/entities/fiche.entity';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FicheRestUrl } from '@shared/rest-urls/fiche.rest.url';

@Injectable({
  providedIn: 'root',
})
export class FicheService {
  #httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient, private url: FicheRestUrl) { }

  getAll = (): Observable<Fiche[]> => this.http.get<Fiche[]>(this.url.getAll(), this.#httpOptions);
  getById = (id: number): Observable<Fiche> => this.http.get<Fiche>(this.url.getById(id), this.#httpOptions);
  create = (body: Fiche): Observable<Fiche> => this.http.post<Fiche>(this.url.create(), body, this.#httpOptions);
  update = (body: Fiche): Observable<any> => this.http.put<any>(this.url.update(), body, this.#httpOptions);
  deleteById = (id: number): Observable<Fiche> => this.http.delete<Fiche>(this.url.deleteById(id), this.#httpOptions);
}
