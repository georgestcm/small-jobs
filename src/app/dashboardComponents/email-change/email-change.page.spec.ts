import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailChangePage } from './email-change.page';

describe('EmailChangePage', () => {
  let component: EmailChangePage;
  let fixture: ComponentFixture<EmailChangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailChangePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
