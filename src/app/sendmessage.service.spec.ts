import { TestBed } from '@angular/core/testing';

import { SendmessageService } from './sendmessage.service';

describe('SendmessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendmessageService = TestBed.get(SendmessageService);
    expect(service).toBeTruthy();
  });
});
