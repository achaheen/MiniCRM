import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCatListComponent } from './main-cat-list.component';

describe('MainCatListComponent', () => {
  let component: MainCatListComponent;
  let fixture: ComponentFixture<MainCatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
