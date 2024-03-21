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
import { RoutingService } from '@spartacus/core';
import {
  LaunchDialogService,
} from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { RecommendProduct } from './recommendProduct';

@Component({
  selector: 'cx-try-on-dialog',
  templateUrl: './try-on-dialog.component.html',
  styleUrls: ['./try-on-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TryOnDialogComponent implements OnInit, OnDestroy {

  protected quantityControl$: Observable<UntypedFormControl>;

  protected subscription = new Subscription();

  recommendProductList: RecommendProduct[] = [
    {
      id: 0,
      name: 'Polka Dot-Light Green-Long Skirt',
      money: '$110.95',
      photo: "assets/images/cloth1.jpeg"
    },
    {
      id: 1,
      name: 'Black-Long Skirt',
      money: '$120.95',
      photo: "assets/images/cloth2.jpg"
    },
    {
      id: 2,
      name: 'Red-Floral--Long Skirt',
      money: '$90.95',
      photo: "assets/images/cloth3.jpg"
    },
    {
      id: 3,
      name: 'Light Brown-Polka-Long Skirt',
      money: '$170.95',
      photo: "assets/images/cloth4.jpeg"
    },
    {
      id: 4,
      name: 'Blue Ripped Long jeans-1Blue Long jeans-1',
      money: '$123.95',
      photo: "assets/images/pants5.jpg"
    },
    {
      id: 5,
      name: 'Blue Long jeans-2',
      money: '$89.95',
      photo: "assets/images/pants6.jpg"
    }
  ]

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected routingService: RoutingService,
    protected el: ElementRef
  ) {}

  ngOnInit(): void {
    console.log("try on init");
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  closeModal(reason: any = 'CLOSE'): void {
    this.launchDialogService.closeDialog(reason);
  }
}
