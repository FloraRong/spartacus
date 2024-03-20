/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product, ProductScope } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { ProductDetailOutlets } from '../product-outlets.model';
import { ModalService } from './_service';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSummaryComponent {
  outlets = ProductDetailOutlets;
  bodyText = 'This text can be updated in modal 1';

  product$: Observable<Product | null> = this.currentProductService.getProduct([
    ProductScope.DETAILS,
    ProductScope.PRICE,
  ]);

  constructor(protected currentProductService: CurrentProductService, protected modalService: ModalService) {}
  
  changeLayout(): void {}

}
