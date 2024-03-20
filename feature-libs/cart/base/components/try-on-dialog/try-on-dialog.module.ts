/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import {
  IconModule,
  ItemCounterModule,
  KeyboardFocusModule,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { TryOnDialogComponent } from './try-on-dialog.component';
import { ModelDisplayComponent } from './components/model/model-display.component';
import { defaultTryOnLayoutConfig } from './default-try-on-layout.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartSharedModule,
    RouterModule,
    SpinnerModule,
    PromotionsModule,
    UrlModule,
    IconModule,
    I18nModule,
    ItemCounterModule,
    KeyboardFocusModule,
  ],
  providers: [provideDefaultConfig(defaultTryOnLayoutConfig)],
  declarations: [TryOnDialogComponent, ModelDisplayComponent],
  exports: [TryOnDialogComponent, ModelDisplayComponent],
})
export class TryOnDialogModule {
  constructor() {
    // Intentional empty constructor
  }
}
