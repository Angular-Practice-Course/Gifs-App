import { Component, inject } from '@angular/core';
import { GridListItemComponent } from '../../components/grid-list-item/grid-list-item.component';
import { GifService } from '../../services/gif-service';

@Component({
  selector: 'app-trending-page',
  imports: [GridListItemComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  gifService = inject(GifService);
}
