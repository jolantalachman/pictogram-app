import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { Tile } from 'src/app/models/tile.model';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { volumeHighSharp } from 'ionicons/icons';

@Component({
  selector: 'app-generated-sentence',
  templateUrl: './generated-sentence.component.html',
  styleUrls: ['./generated-sentence.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, IonIcon, IonSpinner],
})
export class GeneratedSentenceComponent implements OnInit, OnChanges {
  @Input() selectedTiles$: Observable<Tile[]> = of([]);
  @Input() generatedSentence: string | null = null;
  @Output() speakEnded = new EventEmitter<boolean>();
  constructor(private translate: TranslateService) {
    addIcons({ volumeHighSharp });
  }
  playMode: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['generatedSentence'].currentValue) {
      this.playMode = true;
      this.speak(this.generatedSentence);
    }
  }

  ngOnInit() {}

  speak = async (sentence: string | null) => {
    const { languages } = await TextToSpeech.getSupportedLanguages();
    const lang = languages.find((x: string) =>
      x.includes(this.translate.currentLang)
    );
    await TextToSpeech.speak({
      text: sentence ?? '',
      lang: lang,
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient',
      queueStrategy: 1,
    }).then(() => {
      this.playMode = false;
      this.speakEnded.next(true);
    });
  };
}
