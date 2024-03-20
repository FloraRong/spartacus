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

@Component({
  selector: 'cx-try-on-dialog',
  templateUrl: './try-on-dialog.component.html',
  styleUrls: ['./try-on-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TryOnDialogComponent implements OnInit, OnDestroy {

  protected quantityControl$: Observable<UntypedFormControl>;

  protected subscription = new Subscription();

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
