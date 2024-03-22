import { Injectable } from '@angular/core';
import { RecommendProduct } from '../recommendProduct';
import { Subject } from 'rxjs';
import { Product } from '@spartacus/core';
import { BodyModel } from '../components/model/model.model';

@Injectable({
  providedIn: 'root',
})
export class TryOnService {
  defaultRecommendProductList: RecommendProduct[] = [
    {
      code: "1",
      name: 'Polka Dot-Light Green-Long Skirt',
      price: '$110.95',
      photo: "assets/images/cloth1.jpeg"
    },
    {
      code: "2",
      name: 'Black-Long Skirt',
      price: '$120.95',
      photo: "assets/images/cloth2.jpg"
    },
    {
      code: "3",
      name: 'Red-Floral--Long Skirt',
      price: '$90.95',
      photo: "assets/images/cloth3.jpg"
    },
    {
      code: "4",
      name: 'Light Brown-Polka-Long Skirt',
      price: '$170.95',
      photo: "assets/images/cloth4.jpeg"
    },
    {
      code: "5",
      name: 'Blue Ripped Long jeans-1Blue Long jeans-1',
      price: '$123.95',
      photo: "assets/images/pants5.jpg"
    },
    {
      code: "6",
      name: 'Blue Long jeans-2',
      price: '$89.95',
      photo: "assets/images/pants6.jpg"
    }
  ];

  selectedPoduct: RecommendProduct;
  private _selectedProduct = new Subject<RecommendProduct>();
  private devMode = true;
  private lastTriedProduct: RecommendProduct;

  constructor() {}

  enableDeveMode() {
    this.devMode = true;
  }

  isDevMode() {
    return this.devMode;
  }

  subscribeSelectedProduct(next: (value: RecommendProduct) => void) {
    return this._selectedProduct.subscribe(next);
  }

  selectProduct(product: RecommendProduct) {
    if (this.selectedPoduct && product.code === this.selectedPoduct.code) return;
    if (this.devMode && product.code.length > 1) {
      product = this.defaultRecommendProductList[0];
    }
    this.selectedPoduct = product;
    this._selectedProduct.next(this.selectedPoduct);
  }

  getLastTriedProduct(): RecommendProduct {
    return this.lastTriedProduct;
  }

  getProductImage(product: Product): string {
    if (product.images) {
      var group = product.images['GALLERY'];
      if (group) {
        return group[0].product.url;
      }
    }
    return '';
  }

  compareEnabled(): boolean {
    if (this.lastTriedProduct == null) return false;
    if (this.lastTriedProduct.code !== this.selectedPoduct.code) {
      console.log(`New: ${this.selectedPoduct.code}, Last: ${this.lastTriedProduct.code}`);
    }
    return this.lastTriedProduct.code !== this.selectedPoduct.code;
  }

  getAllRecommendProduct(): RecommendProduct[] {
    return this.defaultRecommendProductList;
  }

  tryOn(model?: BodyModel, product?: Product | RecommendProduct): string {
    if (this.isDevMode()) {
      const url = this.getRecommendProductTryOnImage(this.selectedPoduct);
      console.log("[Dev Mode]: " + url);
      this.lastTriedProduct = this.selectedPoduct;
      return url;
    } else {
      if (model && product) {
        return '';
      }
    }
    return '';
  }

  getRecommendProductTryOnImage(product: RecommendProduct | Product): string {
    if (!product) return '';
    return `assets/images/tryOn/${product.code}.png`;
  }
}
