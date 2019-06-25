import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCenterPage } from './job-center.page';

describe('JobCenterPage', () => {
  let component: JobCenterPage;
  let fixture: ComponentFixture<JobCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCenterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
