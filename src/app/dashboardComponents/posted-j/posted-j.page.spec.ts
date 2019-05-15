import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedJPage } from './posted-j.page';

describe('PostedJPage', () => {
  let component: PostedJPage;
  let fixture: ComponentFixture<PostedJPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostedJPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedJPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
