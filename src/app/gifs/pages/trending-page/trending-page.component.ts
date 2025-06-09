import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridListComponent } from "../../components/grid-list/grid-list.component";

@Component({
  selector: 'app-trending-page',
  imports: [GridListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {}
