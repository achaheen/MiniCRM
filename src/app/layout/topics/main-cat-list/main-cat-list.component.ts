import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MainCategoryService} from '../../../shared/services/main-category.service';
import {UtilsService} from '../../../shared/services/utils.service';
import {MainCategory} from '../../../shared/model/mainCategory';

@Component({
  selector: 'app-main-cat-list',
  templateUrl: './main-cat-list.component.html',
  styleUrls: ['./main-cat-list.component.scss']
})
export class MainCatListComponent implements OnInit {
  mainCatCols: any[];
  mainCatList: MainCategory[];
  selectedMainCat: MainCategory;
  enableCreateEditMode = false;

  constructor(private mainCatService: MainCategoryService, private utils: UtilsService) {

    this.mainCatCols = [
      {field: 'id', header: 'ID'},
      {field: 'arabicLabel', header: utils.translateService.instant('arabicLabel')},
      {field: 'englishLabel', header: utils.translateService.instant('englishLabel')},
      {field: 'enabled', header: 'Enabled?'},
      {field: 'creationDate', header: utils.translateService.instant('creationDate')},
      {field: 'createdBy', header: utils.translateService.instant('createdBy')},
      {field: 'modificationDate', header: utils.translateService.instant('modificationDate')},
      {field: 'modifiedBy', header: utils.translateService.instant('modifiedBy')}];
  }

  ngOnInit() {
    this.mainCatService.all().subscribe(value => {
      this.mainCatList = value;
    });
  }

  changeStatus() {
    if (this.selectedMainCat != null && this.selectedMainCat.id != null) {
      this.mainCatService.changeStatus(this.selectedMainCat.id, !this.selectedMainCat.enabled).subscribe(value => {
        this.mainCatList = value;
      });
    }
  }

  handleCreateEditEvent(event) {
    if (event != null) {
      this.mainCatList = event;
      this.enableCreateEditMode = false;
    }
  }


}
