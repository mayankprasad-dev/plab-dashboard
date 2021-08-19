import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultCompareComponent } from './result-compare.component';

describe('ResultCompareComponent', () => {
  let component: ResultCompareComponent;
  let fixture: ComponentFixture<ResultCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
