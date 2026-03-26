import { Injectable } from '@angular/core';
import { Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Tile } from 'src/app/models/tile.model';
import { Observable, switchMap, from } from 'rxjs';
import { getItem, setItem } from 'src/app/storage';

@Injectable({
  providedIn: 'root',
})
export class TileService {
  private defaultTileLayout = 2;

  private tilesCollection = collection(this.firestore, 'tiles');

  constructor(private firestore: Firestore) {}

  getUserTiles(): Observable<Tile[]> {
    return from(
      getDocs(query(this.tilesCollection, where('userId', '==', '')))
    ).pipe(
      switchMap(querySnapshot => {
        const tiles = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            label: data['label'] || 'Brak nazwy',
            category: data['category'] || '',
            isCustom: data['isCustom'] ?? false,
            icon: data['icon'] || '',
            isSelected: false,
          } as Tile;
        });
        return from([tiles]); // Return the tiles as an observable array
      })
    );
  }

  async getTileLayout() {
    const tLay = await getItem('tileLayout');
    return parseInt(tLay ?? this.defaultTileLayout.toString());
  }

  async changeTileLayout(newTileLayout: number) {
    await setItem('tileLayout', newTileLayout.toString());
  }
}
