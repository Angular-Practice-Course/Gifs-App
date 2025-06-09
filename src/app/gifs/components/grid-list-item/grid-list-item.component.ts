import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-grid-list-item',
  imports: [],
  templateUrl: './grid-list-item.component.html',
})
export class GridListItemComponent {
  image = input.required<string>();
}
