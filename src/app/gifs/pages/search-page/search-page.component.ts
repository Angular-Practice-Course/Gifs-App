import { Component, inject } from '@angular/core';
import { GifService } from '../../services/gif-service';
import { GridListComponent } from "../../components/grid-list/grid-list.component";

@Component({
  selector: 'app-search-page',
  imports: [GridListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifService = inject(GifService);

  searchGifs(query: string) {
    this.gifService.searchGifs(query);
  }
}
