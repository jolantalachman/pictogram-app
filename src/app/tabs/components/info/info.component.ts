import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { APIService } from '../tab1/services/api.service';
import { TileService } from '../tab1/services/tile.service';
import { setItem } from 'src/app/storage';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    TranslateModule,
    IonButton,
    IonLabel,
    CommonModule,
    IonInput,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
})
export class InfoComponent implements OnInit {
  prompt = '';
  tileLayout = 0;
  language = this.translate.currentLang;
  isPromptDefault = true;
  isTileLayoutDefault = true;
  constructor(
    private apiService: APIService,
    private tileService: TileService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.initDefault();
  }

  async initDefault() {
    this.prompt = await this.apiService.getPrompt();
    this.tileLayout = await this.tileService.getTileLayout();
  }

  get isLanguageDefault() {
    return this.language === this.translate.currentLang;
  }

  changePrompt() {
    this.apiService.changePrompt(this.prompt);
    this.isPromptDefault = true;
  }

  changeTileLayout() {
    this.tileService.changeTileLayout(this.tileLayout);
    this.isTileLayoutDefault = true;
  }

  async changeLanguage() {
    this.translate.use(this.language);
    await setItem('lang', this.language);
  }

  tLayChanged(event: any) {
    this.isTileLayoutDefault = false;
  }

  promptChanged(event: any) {
    this.isPromptDefault = false;
  }
}
