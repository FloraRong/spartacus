import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'product-tab-item',
  templateUrl: './product-tab-item.component.html',
  styleUrls: ['./product-tab-item.component.scss'], 
})
export class ProductTabItemComponent {
  @Input() tabName: string;
  @Input() active: boolean;
  @Input() content: TemplateRef<any>;
  context: any;

  constructor() {
    this.context = { $implicit: this };
  }
}