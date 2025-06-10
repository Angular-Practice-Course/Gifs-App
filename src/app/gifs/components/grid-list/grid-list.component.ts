import { Component, input } from '@angular/core';
import { GifEntity } from '../../interfaces/gif-entity.interface';
import { GridListItemComponent } from '../grid-list-item/grid-list-item.component';

@Component({
  selector: 'app-grid-list',
  imports: [GridListItemComponent],
  templateUrl: './grid-list.component.html',
})
export class GridListComponent {
  gifs = input.required<GifEntity[]>();
}
