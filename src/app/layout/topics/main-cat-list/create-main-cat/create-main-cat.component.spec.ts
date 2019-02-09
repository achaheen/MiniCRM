import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainCatComponent } from './create-main-cat.component';

describe('CreateMainCatComponent', () => {
  let component: CreateMainCatComponent;
  let fixture: ComponentFixture<CreateMainCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMainCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMainCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
