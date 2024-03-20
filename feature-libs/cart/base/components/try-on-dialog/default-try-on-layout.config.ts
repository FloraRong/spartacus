/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DIALOG_TYPE, LayoutConfig } from '@spartacus/storefront';
import { TryOnDialogComponent } from './try-on-dialog.component';

export const defaultTryOnLayoutConfig: LayoutConfig = {
  launch: {
    SHOW_TRY_ON: {
      inlineRoot: true,
      component: TryOnDialogComponent,
      dialogType: DIALOG_TYPE.DIALOG,
    },
  },
};
