/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Product, RoutingService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { RecommendProduct } from '../../recommendProduct';
import { TryOnService } from '../../services/tryon.service';
import { BodyModel, BodySize, DefaultModel, Sex } from './model.model';

@Component({
  selector: 'cx-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelDisplayComponent implements OnInit, OnDestroy {
  @Input() currentProduct: Product | RecommendProduct;
  @Input() testMode: boolean;

  defaultModel: BodyModel = DefaultModel;
  defaultModelPic = this.getModelPath(this.defaultModel);
  selectedModel: BodyModel;
  modelPicSrc: string;
  eidtMode: boolean = false;
  nextSelectedModel: BodyModel;
  SexOption = [Sex.FEMALE, Sex.MALE, Sex.UNKNOWN];
  uploadedModelPic: any;
  fileReader = new FileReader();
  uploadedPreview = '';
  tryOnImageSrc = '';
  isLoading = false;
  showLarge = false;
  reStartNeeded = false;
  couldCompare = false;
  compareMode = false;
  comparedTryOn: Product | RecommendProduct;

  bodyImages: { size: BodySize; url: string }[] = [
    {
      size: BodySize.RECTANGLE,
      url: `assets/images/body/${BodySize.RECTANGLE.toLowerCase()}.png`,
    },
    {
      size: BodySize.INVERTED_TRIANGLE,
      url: `assets/images/body/${BodySize.INVERTED_TRIANGLE.toLowerCase()}.png`,
    },
    {
      size: BodySize.PEAR,
      url: `assets/images/body/${BodySize.PEAR.toLowerCase()}.png`,
    },
    {
      size: BodySize.ROUND,
      url: `assets/images/body/${BodySize.ROUND.toLowerCase()}.png`,
    },
    {
      size: BodySize.HOURGLASS,
      url: `assets/images/body/${BodySize.HOURGLASS.toLowerCase()}.png`,
    },
  ];

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected routingService: RoutingService,
    protected el: ElementRef,
    protected def: ChangeDetectorRef,
    protected tryOnService: TryOnService
  ) {}

  ngOnInit(): void {
    this.modelPicSrc = this.defaultModelPic;
    this.selectedModel = this.defaultModel;
    this.nextSelectedModel = this.selectedModel;
    if (this.currentProduct) {
      this.tryOnImageSrc = this.tryOnService.getProductImage(this.currentProduct as Product);
    }
    // if (this.testMode) {
    //   this.currentProduct = this.tryOnService.getAllRecommendProduct()[0];
    //   this.tryOnImageSrc =  'assets/images/cloth1.jpeg';
    // } else {
    //   if (this.currentProduct) {
    //     this.tryOnImageSrc = this.tryOnService.getProductImage(this.currentProduct as Product);
    //   }
    // }

    this.tryOnService.subscribeSelectedProduct(() => {
      this.reStartNeeded = true;
      this.def.detectChanges();
    });
  }

  ngOnDestroy(): void {
    console.log('Model display destroyed');
  }

  getModelPath(bodyModel: BodyModel): string {
    return `assets/images/model/${bodyModel.sex.toLocaleLowerCase()}/${bodyModel.size.toLowerCase()}/1.png`;
  }

  getCurrentBodySizeImage(bodyModel: BodyModel): {
    size: BodySize;
    url: string;
  } {
    return this.bodyImages.find((image) => image.size === bodyModel.size) || this.bodyImages[0];
  }

  changeEditMode() {
    this.eidtMode = !this.eidtMode;
  }

  isSelectedBody(size: BodySize) {
    return size === this.nextSelectedModel.size;
  }

  changeBodySize(size: BodySize) {
    this.nextSelectedModel.size = size;
    this.modelPicSrc = this.getModelPath(this.nextSelectedModel);
  }

  changeSex(sex: Sex) {
    this.nextSelectedModel.sex = sex;
  }

  saveModel() {
    this.selectedModel = this.nextSelectedModel;
    this.modelPicSrc = this.uploadedPreview || this.getModelPath(this.selectedModel);
    this.reStartNeeded = true;
    this.changeEditMode();
  }

  upload() {
    var uploadInput: any = document.querySelector('#uploadInput') || document.getElementById('uploadInput');
    if (uploadInput) {
      uploadInput.click();
      uploadInput.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => (this.uploadedPreview = reader.result?.toString() || '');
        }
        setTimeout(() => {
          console.log('detectChanges');
          this.def.detectChanges();
        }, 1500);
      };
    }
  }

  changeModelUrl(url: string) {
    this.modelPicSrc = url;
  }

  onFileSelected(event: any) {
    this.uploadedModelPic = event.target.files[0];
  }

  cancle() {
    this.changeEditMode();
    this.modelPicSrc = this.getModelPath(this.selectedModel);
  }

  startTryOn() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.reStartNeeded = false;
      this.couldCompare = this.tryOnService.compareEnabled();
      if (this.couldCompare) this.comparedTryOn = this.tryOnService.getLastTriedProduct();
      this.tryOnImageSrc = this.tryOnService.tryOn();
      this.def.detectChanges();
    }, 2500);
  }

  compare() {
    this.compareMode = true;
  }

  getLastTriedImage() {
    console.log(this.comparedTryOn);
    return this.tryOnService.getRecommendProductTryOnImage(this.comparedTryOn);
  }
}
