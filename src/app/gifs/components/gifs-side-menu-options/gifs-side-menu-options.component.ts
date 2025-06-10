import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../services/gif-service';

interface MenuOption {
  icon: string;
  label: string;
  subtitle?: string;
  route: string;
}

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.component.html',
})
export class GifsSideMenuOptionsComponent {
  gifService = inject(GifService);

  searchRecordMenu = computed<MenuOption[]>(() =>
    this.gifService.searchRecordKeys().map(record => ({
      icon: 'fa-solid fa-clock-rotate-left',
      label: record,
      route: `/dashboard/history/${record}`,
    }))
  );

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-house',
      label: 'Trending',
      subtitle: 'Gifs populares',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Buscador',
      subtitle: 'Buscar gifs',
      route: '/dashboard/search',
    },
  ];
}
