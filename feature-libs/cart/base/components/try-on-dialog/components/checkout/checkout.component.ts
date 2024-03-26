import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Product, RoutingService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { Subscription, take } from 'rxjs';
import { RecommendProduct } from '../../recommendProduct';
import { TryOnService } from '../../services/tryon.service';

@Component({
  selector: 'cx-checkout-part',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  selectedClothImageUrl: string;
  selectedClothPrice: string;
  recommendProduct: RecommendProduct;
  pickupStore: string;

  @Input() testMode: boolean;
  @Input() currentProduct: Product;

  constructor(
    protected activeCartService: ActiveCartFacade,
    private tryOnService: TryOnService,
    protected def: ChangeDetectorRef,
    protected routingService: RoutingService,
    protected launchDialogService: LaunchDialogService
  ) {}
  subs: Subscription[] = [];
  ngOnInit(): void {
    this.subs.push(
      this.tryOnService.subscribeSelectedProduct((recommendProduct) => {
        if (this.currentProduct.code !== recommendProduct.code) {
          this.recommendProduct = recommendProduct;
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

  checkout() {
    const quantity = 1;
    this.activeCartService
      .getEntries()
      .pipe(take(1))
      .subscribe(() => {
        this.activeCartService.addEntry(this.currentProduct.code as string, quantity, this.pickupStore);

        if (this.recommendProduct) {
          this.activeCartService.addEntry(this.recommendProduct.realCode as string, quantity, this.pickupStore);
        }

        setTimeout(() => {
          this.launchDialogService.closeDialog('close');
          this.routingService.goByUrl('/cart');
        }, 2000);
      });
  }
}
