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
import { volumeHighSharp, closeOutline } from 'ionicons/icons';

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
    addIcons({ volumeHighSharp, closeOutline });
  }
  playMode: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['generatedSentence'].currentValue) {
      this.playMode = true;
    }
  }

  ngOnInit() {}

  speak = () => {
    TextToSpeech.speak({
      text: this.generatedSentence ?? '',
      lang: 'en-US',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient',
      queueStrategy: 1,
    }).then(() => {
      this.playMode = false;
      this.speakEnded.emit(true);
    });
  };

  close() {
    this.speakEnded.next(true);
  }
}
