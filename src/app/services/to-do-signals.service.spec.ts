import { TestBed } from '@angular/core/testing';

import { ToDoSignalsService } from './to-do-signals.service';

describe('ToDoSignalsService', () => {
  let service: ToDoSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
