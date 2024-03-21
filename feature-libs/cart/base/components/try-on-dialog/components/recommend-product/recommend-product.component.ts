import { Component, Input } from '@angular/core';
import { RecommendProduct } from '../../recommendProduct';
import { TryOnService } from '../../services/tryon.service'

@Component({
  selector: 'recommend-products',
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="recommendProduct.photo" (click)="tryOnProduct()">
      <h5 class="listing-name">{{ recommendProduct.name }}</h5>
      <p class="listing-money">{{ recommendProduct.money}}</p>
    </section>
  `,
  styleUrls: ['./recommend-product.component.scss'],
})

export class RecommendProductComponent {

  @Input() recommendProduct!: RecommendProduct;

  constructor(private tryOnService: TryOnService) { }

  tryOnProduct()
  {
    this.tryOnService.selecteProduct(this.recommendProduct);
  }

}
