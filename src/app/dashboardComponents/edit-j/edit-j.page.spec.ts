import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJPage } from './edit-j.page';

describe('EditJPage', () => {
  let component: EditJPage;
  let fixture: ComponentFixture<EditJPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
