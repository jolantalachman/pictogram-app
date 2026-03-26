import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonGrid,
  IonCol,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonButtons,
  IonMenuButton,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonInput,
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { Tile } from 'src/app/models/tile.model';
import { CommonModule, NgFor } from '@angular/common';
import { addIcons } from 'ionicons';
import { heart, add } from 'ionicons/icons';
import { Router } from '@angular/router';
import { TileService } from './services/tile.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { APIService } from './services/api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import {
  GeneratedSentenceComponent,
  MenuComponent,
  TileComponent,
} from './components';
import { FormsModule } from '@angular/forms';
import 'emoji-picker-element';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonLabel,
    IonItem,
    IonCol,
    IonGrid,
    IonRow,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    NgFor,
    FontAwesomeModule,
    CommonModule,
    TranslateModule,
    IonMenuButton,
    IonButtons,
    MenuComponent,
    TileComponent,
    GeneratedSentenceComponent,
    IonModal,
    IonInput,
    IonSelect,
    IonSelectOption,
    FormsModule,
    IonSpinner,
    IonRefresher,
    IonRefresherContent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  refresh = new BehaviorSubject(false);
  refresh$ = this.refresh.asObservable();
  tiles$: Observable<Tile[]> = this.refresh$.pipe(
    switchMap(() => this.tileService.getUserTiles()),
    tap(() => this.selectedTiles.next([]))
  );

  private selectedTiles: BehaviorSubject<Tile[]> = new BehaviorSubject(
    [] as Tile[]
  );
  selectedTiles$ = this.selectedTiles.asObservable();
  generatedSentence: string | null = '';
  selectedCategory?:
    | 'nouns'
    | 'verbs'
    | 'adjectives'
    | 'questions'
    | 'expressions';
  isPlayMode: boolean = false;

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  category!: string;
  icon!: string;

  tileSize = 12;

  constructor(
    public route: Router,
    private tileService: TileService,
    private apiService: APIService,
    private translate: TranslateService
  ) {
    addIcons({ heart, add });
  }

  ngOnInit(): void {
    this.getTileSize();
  }

  toggleTileSelection(tile: Tile): void {
    if (this.isPlayMode) {
      return;
    }
    const tiles = this.selectedTiles.value;
    if (tiles.length > 7 && !tile.isSelected) {
      return;
    }

    tile.isSelected = !tile.isSelected;
    if (tile.isSelected) {
      this.selectedTiles.next([...tiles, tile]);
    } else {
      const index = tiles.indexOf(tile);
      if (index !== -1) {
        // Create a new array without the unselected tile
        tiles.splice(index, 1);
        this.selectedTiles.next([...tiles]); // Emit the updated array
      }
    }
  }

  ionViewWillEnter() {
    this.getTileSize();
  }

  generateSentence(tiles: Tile[]): void {
    this.isPlayMode = true;
    const selectedTiles = this.selectedTiles.value.map(tile => {
      return {
        label: this.translate.instant(tile.label),
        icon: tile.icon,
      };
    });

    // Return early if no tiles are selected
    if (selectedTiles.length === 0) {
      return;
    }

    // Create prompt by joining selected tile labels
    const prompt = selectedTiles.map(tile => tile.label).join(' ');

    // Generate sentence from the prompt
    this.apiService.generateSentence(prompt).then(sentence => {
      if (sentence) {
        this.generatedSentence = sentence;
      } else {
        this.isPlayMode = false;
      }
    });
  }

  handleSpeakEnded() {
    const tiles = this.selectedTiles.value;
    tiles.forEach(tile => (tile.isSelected = false));
    this.selectedTiles.next([]);
    this.generatedSentence = '';
    this.isPlayMode = false;
  }

  getCategory(tiles: Tile[], category: string) {
    return (
      tiles.some(tile => tile.category === category) &&
      (this.selectedCategory === category || !this.selectedCategory)
    );
  }

  onCategorySelected(
    event?: 'nouns' | 'verbs' | 'adjectives' | 'questions' | 'expressions'
  ) {
    this.selectedCategory = event;
  }

  async getTileSize() {
    const tLay = await this.tileService.getTileLayout();
    this.tileSize = 12 / tLay;
  }

  refreshTiles() {
    this.refresh.next(true);
  }

  async loadTiles() {
    this.refreshTiles();
  }

  handleRefresh(event: CustomEvent) {
    this.loadTiles().then(() =>
      (event.target as HTMLIonRefresherElement).complete()
    );
  }

  emojiClick(event: any) {
    this.icon = event.detail.unicode;
  }
}
