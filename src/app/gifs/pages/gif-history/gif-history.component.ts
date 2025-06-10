import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GridListComponent } from '../../components/grid-list/grid-list.component';
import { GifService } from '../../services/gif-service';

@Component({
  selector: 'app-gif-history',
  imports: [GridListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {
  gifService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map(params => params['query'] || ''))
  );

  searchEntry = computed(() => this.gifService.searchRecord()[this.query()]);
}
