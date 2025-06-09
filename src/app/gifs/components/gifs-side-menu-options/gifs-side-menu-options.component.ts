import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  icon: string;
  label: string;
  subtitle: string;
  route: string;
}

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.component.html',
})
export class GifsSideMenuOptionsComponent {
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
