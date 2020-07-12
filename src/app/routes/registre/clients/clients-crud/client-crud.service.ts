import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientCrudService {

  #isEditionMode: boolean;

  get isEditionMode(): boolean {
    return this.#isEditionMode;
  }

  set isEditionMode(b: boolean) {
    this.#isEditionMode = b;
  }

}




