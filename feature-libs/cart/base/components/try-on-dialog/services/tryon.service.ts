import { Injectable } from '@angular/core';
import { RecommendProduct } from '../recommendProduct';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TryOnService {

  selectedPoduct: RecommendProduct;
  private _selectedProduct = new Subject<RecommendProduct>();

  constructor() { }

  subscribeSelectedProduct(next: (value: RecommendProduct) => void) {
    return this._selectedProduct.subscribe(next);
  }

  selecteProduct(product:RecommendProduct)
  {
    this.selectedPoduct = product;
    this._selectedProduct.next(this.selectedPoduct);
  }
}