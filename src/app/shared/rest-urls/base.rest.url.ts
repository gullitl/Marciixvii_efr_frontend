import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseRestUrl {
  #baseUrl = () => 'http://localhost:63557/marciixvii/';
  monteUrl = (postfixUrl: string) => this.#baseUrl().concat(postfixUrl);
}
