/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Product, RoutingService } from '@spartacus/core';
import {
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { RecommendProduct } from './recommendProduct';
import { ShowTryOnModalEvent } from '../add-to-cart/try-on.model';
import { TryOnService } from './services/tryon.service';

@Component({
  selector: 'cx-try-on-dialog',
  templateUrl: './try-on-dialog.component.html',
  styleUrls: ['./try-on-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TryOnDialogComponent implements OnInit, OnDestroy {

  protected quantityControl$: Observable<UntypedFormControl>;

  protected subscription = new Subscription();

  recommendProductList: RecommendProduct[];

  testMode: boolean;

  currentProduct: Product;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected routingService: RoutingService,
    protected el: ElementRef,
    private tryOnService: TryOnService
  ) {}

  ngOnInit(): void {
    this.testMode = this.tryOnService.isDevMode();
    this.recommendProductList = this.tryOnService.getAllRecommendProduct();
    this.launchDialogService.data$.subscribe(
      (dialogData: ShowTryOnModalEvent) => {
        if (dialogData.product) {
          this.currentProduct = dialogData.product;
          this.tryOnService.selectProduct({
            code: this.currentProduct.code || '',
            name: this.currentProduct.name || '',
            photo: this.tryOnService.getProductImage(this.currentProduct),
            price: (this.currentProduct.price?.value || '') + (this.currentProduct.price?.currencyIso || '')
          });
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  closeModal(reason: any = 'CLOSE'): void {
    this.launchDialogService.closeDialog(reason);
  }
}
