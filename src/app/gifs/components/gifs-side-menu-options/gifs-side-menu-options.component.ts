import { Component } from '@angular/core';

interface MenuOption{
  icon: string;
  label: string;
  subtitle: string;
  route: string;
}

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [],
  templateUrl: './gifs-side-menu-options.component.html',
})
export class GifsSideMenuOptionsComponent {

  menuOptions: MenuOption[] = [
    {
      icon: 'home',
      label: 'Home',
      subtitle: 'Go to home page',
      route: '/gifs/home'
    },
    {
      icon: 'search',
      label: 'Search',
      subtitle: 'Search for GIFs',
      route: '/gifs/search'
    },

  ];

}
