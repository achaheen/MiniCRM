import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatListComponent } from './sub-cat-list.component';

describe('SubCatListComponent', () => {
  let component: SubCatListComponent;
  let fixture: ComponentFixture<SubCatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
