import { Component, Input } from '@angular/core';
import { RecommendProduct } from '../../recommendProduct';
import { TryOnService } from '../../services/tryon.service'

@Component({
  selector: 'cx-recommend-products',
  template: `
    <section style="cursor: pointer;" class="listing">
      <img class="listing-photo" [src]="recommendProduct.photo" (click)="tryOnProduct()">
      <h5 class="listing-name">{{ recommendProduct.name }}</h5>
      <p class="listing-price">{{ recommendProduct.price}}</p>
    </section>
  `,
  styleUrls: ['./recommend-product.component.scss'],
})

export class RecommendProductComponent {

  @Input() recommendProduct!: RecommendProduct;

  constructor(private tryOnService: TryOnService) { }

  tryOnProduct()
  {
    this.tryOnService.selectProduct(this.recommendProduct);
  }

}
