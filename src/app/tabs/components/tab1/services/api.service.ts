import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { getItem, setItem } from 'src/app/storage';

import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private app = initializeApp(environment.firebase);
  private functions = getFunctions(this.app, 'europe-central2');

  private defaultPrompt = `Create exactly one clear, grammatically correct sentence or question using ONLY the provided words. Do NOT: add unrelated words, refer to previous sentences, explain anything, include extra text.`;

  constructor(
    private translate: TranslateService,
    private alertController: AlertController
  ) {
    this.initPrompt();
  }

  async initPrompt() {
    const prompt = await this.getPrompt();
    await setItem('prompt', prompt);
  }

  async generateSentence(inputWords: string): Promise<string | null> {
    try {
      const prompt = await this.getPrompt();

      const fn = httpsCallable(this.functions, 'generateSentence');

      const response: any = await fn({
        inputWords,
        language: this.translate.currentLang,
        prompt,
      });

      return response?.data?.result || null;
    } catch (error: any) {
      this.showErrorAlert(error);
      return null;
    }
  }

  async showErrorAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: error?.message || 'Something went wrong',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async getPrompt() {
    return (await getItem('prompt')) ?? this.defaultPrompt;
  }

  async changePrompt(newPrompt: string) {
    if (!newPrompt || newPrompt.length > 1000) return;
    await setItem('prompt', newPrompt.trim());
  }
}
