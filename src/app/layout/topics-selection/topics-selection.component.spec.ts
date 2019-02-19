import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsSelectionComponent } from './topics-selection.component';

describe('TopicsSelectionComponent', () => {
  let component: TopicsSelectionComponent;
  let fixture: ComponentFixture<TopicsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
