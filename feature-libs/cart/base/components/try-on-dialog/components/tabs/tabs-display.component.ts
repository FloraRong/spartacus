import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { ProductTabItemComponent } from '../product-tab-item/product-tab-item.component';

@Component({
  selector: 'ui-tabs',
  templateUrl: './tabs-display.component.html',
  styleUrls: ['./tabs-display.component.scss'], 
})
export class UiTabsComponent implements AfterContentInit {
  @ContentChildren(ProductTabItemComponent) tabs: QueryList<ProductTabItemComponent>;
  activeComponent: ProductTabItemComponent;

  ngAfterContentInit() {
    this.activateTab(this.tabs.toArray()[0]); // 默认激活第一个选项卡
  }

  activateTab(tab: ProductTabItemComponent) {
    this.tabs.forEach(t => t.active = false); // 先将所有选项卡设为非激活状态
    console.log(tab.active);
    console.log(tab.content);
    tab.active = true; // 设置当前选项卡为激活状态
    console.log(tab.active);
    this.activeComponent = tab;
  }
}