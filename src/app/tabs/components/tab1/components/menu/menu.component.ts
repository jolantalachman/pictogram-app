import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonMenu,
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  MenuController,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonMenu,
    IonHeader,
    IonContent,
    IonTitle,
    IonToolbar,
    TranslateModule,
    IonLabel,
    IonItem,
  ],
})
export class MenuComponent implements OnInit {
  @Input() selectedCategory?:
    | 'nouns'
    | 'verbs'
    | 'adjectives'
    | 'questions'
    | 'expressions';
  @Output() selectCategory = new EventEmitter<
    'nouns' | 'verbs' | 'adjectives' | 'questions' | 'expressions' | undefined
  >();
  constructor(private menu: MenuController) {}

  ngOnInit() {}

  toggleList(
    view?: 'nouns' | 'verbs' | 'adjectives' | 'questions' | 'expressions'
  ) {
    if (view !== this.selectedCategory) {
      this.selectCategory.emit(view);
      this.menu.close();
    }
  }
}
