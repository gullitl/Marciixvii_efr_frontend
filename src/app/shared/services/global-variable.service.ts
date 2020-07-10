import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariableService {

  #isEditionModeVGClientsCrudComponent: BehaviorSubject<boolean>;
  #iemvgccc = 'isEditionModeVGClientsCrudComponent';

  constructor(private localStorage: LocalStorageService) {
    this.#isEditionModeVGClientsCrudComponent = new BehaviorSubject<boolean>(this.localStorage.get(this.#iemvgccc));
  }

  get isEditionModeVGClientsCrudComponent(): boolean {
    return this.#isEditionModeVGClientsCrudComponent.value;
  }

  set isEditionModeVGClientsCrudComponent(b: boolean) {
    this.localStorage.set(this.#iemvgccc, b);
    this.#isEditionModeVGClientsCrudComponent.next(b);
  }

}




