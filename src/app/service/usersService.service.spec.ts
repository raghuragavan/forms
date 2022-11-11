import { TestBed } from '@angular/core/testing';

import { usersServiceService } from './UsersService.service';

describe('UserserviceService', () => {
  let service: usersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(usersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
