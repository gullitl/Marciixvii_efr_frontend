import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '@core';

@Component({
  selector: 'app-translate',
  template: `
    <button mat-icon-button class="matero-toolbar-button" [matMenuTriggerFor]="menu">
      <mat-icon>translate</mat-icon>
      <span class="badge bg-blue-500">{{currentLang()}}</span>
    </button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let lang of langs | keyvalue" (click)="useLanguage(lang.key)">
        <span>{{ lang.value }}</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      .flag-icon {
        margin-right: 8px;
      }
    `,
  ],
})
export class TranslateComponent {
  langs = {
    'fr-FR': 'Français',
    'en-US': 'English'
  };

  constructor(public translate: TranslateService, private settings: SettingsService) {
    this.useLanguage('fr-FR');
  }

  currentLang() {
    const lang = this.translate.currentLang.substring(0, 2);
    return lang.charAt(0).toUpperCase() + lang.slice(1);
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.settings.setLanguage(language);
  }
}
