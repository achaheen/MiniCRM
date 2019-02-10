import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubCatComponent } from './create-sub-cat.component';

describe('CreateSubCatComponent', () => {
  let component: CreateSubCatComponent;
  let fixture: ComponentFixture<CreateSubCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSubCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
