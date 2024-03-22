import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TryOnService } from '../../services/tryon.service';
import { Subscription } from 'rxjs';
import { Product } from '@spartacus/core';

@Component({
  selector: 'cx-checkout-part',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  selectedClothImageUrl: string;
  selectedClothPrice: string;

  @Input() testMode: boolean;
  @Input() currentProduct: Product;

  constructor(private tryOnService: TryOnService, protected def: ChangeDetectorRef,) {}
  subs: Subscription[] = [];
  ngOnInit(): void {
    this.subs.push(
      this.tryOnService.subscribeSelectedProduct((recommendProduct) => {
        if (this.currentProduct.code !== recommendProduct.code) {
          this.selectedClothImageUrl = recommendProduct.photo || '';
          this.selectedClothPrice = recommendProduct.price || '';
          this.def.detectChanges();
        }
      })
    );
  }

  removeSelectedCloth() {
    this.selectedClothImageUrl = '';
    this.def.detectChanges();
  }

  checkout() {}
}
