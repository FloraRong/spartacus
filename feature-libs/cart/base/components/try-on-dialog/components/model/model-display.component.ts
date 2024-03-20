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
import { RoutingService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';

@Component({
  selector: 'cx-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelDisplayComponent implements OnInit, OnDestroy {

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected routingService: RoutingService,
    protected el: ElementRef
  ) {}

  ngOnInit(): void {
    console.log('Model display on init');
  }

  ngOnDestroy(): void {
    console.log('Model display destroyed');
  }
}
