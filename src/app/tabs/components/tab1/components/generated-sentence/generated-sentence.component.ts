import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
} from '@angular/core';
import { TranslateModule} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { Tile } from 'src/app/models/tile.model';
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
export class GeneratedSentenceComponent {
  @Input() selectedTiles$: Observable<Tile[]> = of([]);
  @Input() playMode: boolean = false;

  constructor() {
    addIcons({ volumeHighSharp });
  }
  
}
