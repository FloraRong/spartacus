import { Component, Input } from '@angular/core';
import { RecommendProduct } from '../../recommendProduct';

@Component({
  selector: 'recommend-products',
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="recommendProduct.photo" >
      <h5 class="listing-heading">{{ recommendProduct.name }}</h5>
      <p class="listing-location">{{ recommendProduct.money}}</p>
    </section>
  `,
  styleUrls: ['./recommend-product.component.scss'],
})

export class RecommendProductComponent {

  @Input() recommendProduct!: RecommendProduct;

}
