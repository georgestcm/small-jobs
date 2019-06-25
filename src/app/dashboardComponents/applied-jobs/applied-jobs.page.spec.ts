import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedJobsPage } from './applied-jobs.page';

describe('AppliedJobsPage', () => {
  let component: AppliedJobsPage;
  let fixture: ComponentFixture<AppliedJobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedJobsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
