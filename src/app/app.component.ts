import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from '@angular/fire/compat';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { getItem } from './storage';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

library.add(fas);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    TranslateModule,
    CommonModule,
    AngularFireModule,
    FontAwesomeModule,
  ],
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    library: FaIconLibrary
  ) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    this.initializeLanguage();
    library.addIconPacks(fas);
  }

  async initializeLanguage() {
    const browserLang = this.translate.getBrowserLang() ?? 'en';
    const storedLang = await getItem('lang');
    this.translate.use(
      storedLang ?? (browserLang.match(/en/) ? browserLang : 'en')
    );
  }
}
