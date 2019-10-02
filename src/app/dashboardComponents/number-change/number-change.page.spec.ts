import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberChangePage } from './number-change.page';

describe('NumberChangePage', () => {
  let component: NumberChangePage;
  let fixture: ComponentFixture<NumberChangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberChangePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
