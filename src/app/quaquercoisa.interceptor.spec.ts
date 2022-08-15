import { TestBed } from '@angular/core/testing';

import { QuaquercoisaInterceptor } from './quaquercoisa.interceptor';

describe('QuaquercoisaInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      QuaquercoisaInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: QuaquercoisaInterceptor = TestBed.inject(QuaquercoisaInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
