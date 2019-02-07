import {MainCategory} from '../../shared/model/mainCategory';
import {Subcategory} from '../../shared/model/subcategory';
import {Topic} from '../../shared/model/topic';
import {MainCategoryService} from '../../shared/services/main-category.service';
import {SubCategoryService} from '../../shared/services/sub-category.service';
import {TopicService} from '../../shared/services/topic.service';
import {UtilsService} from '../../shared/services/utils.service';

export class BasicTopicSelection {

  constructor(public topicService: TopicService
    , public subCategoryService: SubCategoryService,
              public mainCatService: MainCategoryService, public utils: UtilsService) {
  }

  protected mainCategories: MainCategory[] = [];
  protected selectedMainCategory: MainCategory;
  protected subCategories: Subcategory[] = [];
  protected selectedSubCategory: Subcategory;
  protected topics: Topic[] = [];
  protected selectedTopic: Topic;

  public updateTopicList() {
    if (this.selectedSubCategory != null && this.selectedSubCategory.id != null) {
      this.topicService.active(this.selectedSubCategory.id).subscribe(
        result => {
          const topic: Topic = {id: null, arabicLabel: 'Select Topic', englishLabel: 'Select Topic'};
          this.topics = result;
          this.topics.unshift(topic);
        }
      );

    } else {
      this.topics = [];
      this.selectedTopic = null;
    }
  }

  public updateSubCategory() {
    if (this.selectedMainCategory != null && this.selectedMainCategory.id != null) {
      this.subCategoryService.active(this.selectedMainCategory.id).subscribe(
        result => {
          this.subCategories = result;
          const subcategory: Subcategory = {englishLabel: 'Select Sub Category', arabicLabel: 'Select Sub Category', id: null};
          this.subCategories.unshift(subcategory);
        }
      );
    } else {
      this.topics = [];
      this.selectedTopic = null;
      this.selectedSubCategory = null;
      this.subCategories = [];
    }
  }

  public listAllMainCategories() {
    this.mainCatService.active().subscribe(
      result => {
        const mainCat: MainCategory = {id: null, arabicLabel: 'Select Main Category', englishLabel: 'Select Main Category'};
        this.mainCategories = result;
        this.mainCategories.unshift(mainCat);
      }
    );
  }


}
