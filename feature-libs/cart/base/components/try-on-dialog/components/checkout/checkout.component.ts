import { Component, OnInit } from '@angular/core';
import { TryOnService } from '../../services/tryon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'checkout-part',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})

export class CheckoutComponent implements OnInit {

  selectedClothImageUrl:string;
  selectedClothPrice:string;

  constructor(private tryOnService: TryOnService) { }
  subs: Subscription[] = [];
  ngOnInit(): void {
    this.subs.push(
      this.tryOnService.subscribeSelectedProduct((recommendProduct) => {
        this.selectedClothImageUrl = recommendProduct.photo;
        this.selectedClothPrice = recommendProduct.money;
      })
    );
  }

  removeSelectedCloth()
  {
    this.selectedClothImageUrl = "assets/images/";
  }
  

  checkout()
  {

  }
}
