import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicItemFormComponent } from './topic-item-form.component';

describe('TopicItemFormComponent', () => {
  let component: TopicItemFormComponent;
  let fixture: ComponentFixture<TopicItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
