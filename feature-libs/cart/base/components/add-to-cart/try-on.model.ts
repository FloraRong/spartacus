import { CxEvent, Product } from '@spartacus/core';

export class ShowTryOnModalEvent extends CxEvent {
  product: Product;
}
