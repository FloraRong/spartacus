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
import { BodyModel, BodySize, DefaultModel, Sex } from './model.model';

@Component({
  selector: 'cx-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelDisplayComponent implements OnInit, OnDestroy {
  defaultModel: BodyModel = DefaultModel;
  defaultModelPic = this.getModelPath(this.defaultModel);
  selectedModel: BodyModel;
  modelPicSrc: string;
  eidtMode: boolean = false;
  nextSelectedModel: BodyModel;
  SexOption = [Sex.FEMALE, Sex.MALE, Sex.UNKNOWN];
  uploadedModelPic: any;

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
    protected el: ElementRef
  ) {}

  ngOnInit(): void {
    this.modelPicSrc = this.defaultModelPic;
    this.selectedModel = this.defaultModel;
    this.nextSelectedModel = this.selectedModel;
  }

  ngOnDestroy(): void {
    console.log('Model display destroyed');
  }

  getModelPath(bodyModel: BodyModel): string {
    return `assets/images/model/${bodyModel.sex.toLocaleLowerCase()}/${bodyModel.size.toLowerCase()}/1.jpg`;
  }

  getCurrentBodySizeImage(bodyModel: BodyModel): { size: BodySize; url: string} {
    return this.bodyImages.find(image => image.size === bodyModel.size) || this.bodyImages[0];
  }

  changeEditMode() {
    this.eidtMode = !this.eidtMode;
  }

  isSelectedBody(size: BodySize) {
    return size === this.nextSelectedModel.size;
  }

  changeBodySize(size: BodySize) {
    this.nextSelectedModel.size = size;
  }

  changeSex(sex: Sex) {
    this.nextSelectedModel.sex = sex;
  }

  saveModel() {
    this.selectedModel = this.nextSelectedModel;
    this.eidtMode = false;
    this.modelPicSrc = this.getModelPath(this.selectedModel);

  }

  upload() {
    console.log('upload');
    var uploadInput: any = document.querySelector("#uploadInput") || document.getElementById("uploadInput");
    if (uploadInput) {
      uploadInput.click();
      uploadInput.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          // 创建FormData对象并添加文件
          const formData = new FormData();
          formData.append('image', file);
          console.log(formData);
        }
      };
    }
  }

  onFileSelected(event: any) {
    this.uploadedModelPic = event.target.files[0];
  }
}
