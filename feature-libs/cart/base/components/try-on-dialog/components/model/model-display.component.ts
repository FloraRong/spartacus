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
  SexOption = Sex;
  uploadedModelPic: any;

  bodyImages: { size: BodySize; url: string }[] = [
    {
      size: BodySize.THIN,
      // url: 'assets/images/body-thin.jpg',
      url: 'https://s3-alpha-sig.figma.com/img/819a/fa14/93c144a1701df52ff90350ecc10fb82a?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jq72pKKwXYs8qummzBQjoxV5xtcdogXD5L9Fn3kDW3lQFRPyM2oLmqjDpLBDI5Ij-JPOZSVqLDdzBVU00wdFU~oKzTVezuWIKaZTsSVdELFy~LxmTGNsmokOwb-Y5xzSCtGV~GlCJg8cUddoXJQ7uYODBiFFx-jiQE5zw4kKNGfKGOQhOB1nB0L688zaY5S2bbGta9m7HpZgy4lwZPWUxzoMW8iktqkg5wuZgQXfB1pV9mjsAcnZybFNyLK-m-QsgMylaH2~NAr0ViiGfjqnuqgmpjNWGAi7-zM3N6lT5WZ5g9zrMAv-K1mZ887LjbSO21k~Y79M-oQfZIWBJRL8gg__'
    },
    {
      size: BodySize.MEDIUM,
      // url: 'assets/images/body-medium.jpg',
      url: 'https://s3-alpha-sig.figma.com/img/455a/9f01/07663164a04df2347b2bcc80a3dc8774?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iz4pz6JjUtAt3pMq9E-42wEg4WURJvHSOWnR5nyUI2XfYf3CZhKha5fGfvubVfONvI3queL~fsa2ujxQfY3vCNzvoWJZI6na1xWfbJjc4FUU52AGZLvaG0caooVI5TTV37Jwq1fjarj6oismBZxlo1cXxjaXQHETd7hKIimlfUbkVKjlEscYuFUS-dthx7wuDHpb9jK25LtwuPZzbWXqCzV8jDoof7bXvej9I8TeJxtqoQrAGqW2PQVw--pJj593t076awsoxax~s9nIC7fAPxYnTBszGTkj4RP6xTs96IDZB72fzypF5SMy2p0rZUCw-I~-fpa~WbvYcw36pwguYw__'
    },
    {
      size: BodySize.FAT,
      // url: 'assets/images/body-fat.jpg',
      url: 'https://s3-alpha-sig.figma.com/img/5017/00bc/08805a85cf411c36f19c276439b22ca5?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H9bouYTWu52AJFSAvTc1Ybr2wNAHmGEWniEPfATDPN~AwLQSRdgxhj~Tkwx94u~PgZMwMo2G7njAZCA1VC8XhiG1CQmdt2g27UOGb6AHIEVSxH05ZzxV-k5H0sYkrC4u21mE3aRjwbIBalh-5ZD1WuB~IJkadsdhXNXm13bDD9BSDyml6QCd6-PwJ2jDxDoPXgzgw4vHivDyEbGZu24Psx7s00HJTpD~pQhuTpALMXlySw5utt-8WtzulM8ow3W2Vbjzgy~-FcxxrRjGiqFMpDvtIKhsOaAtnJmYJB0UL2NwVjVEhKkLjYsAB1PtUIxSuaecPNU8TKch8xjf5WkcoQ__'
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
    console.log('Model display on init');
  }

  ngOnDestroy(): void {
    console.log('Model display destroyed');
  }

  getModelPath(bodyModel: BodyModel): string {
    return `assets/images/model-${bodyModel.sex.toLocaleLowerCase()}-${bodyModel.size.toLowerCase()}.jpg`;
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
