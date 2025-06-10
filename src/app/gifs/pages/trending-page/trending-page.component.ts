import { Component, inject } from '@angular/core';
import { GridListComponent } from '../../components/grid-list/grid-list.component';
import { GifService } from '../../services/gif-service';

@Component({
  selector: 'app-trending-page',
  imports: [GridListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  gifService = inject(GifService);
}
