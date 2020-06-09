import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth.interceptor';
import { DataProviderService } from '../services/data-provider/data-provider.service';
import { environment } from '../../../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe(`HttpInterceptor`, () => {
  let httpMock: HttpTestingController;
  let service: DataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        DataProviderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(DataProviderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    service.getTransfers().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}` + `transfers`);

    expect(httpRequest.request.headers.get('Authorization')).toBe('Basic b3Zhc3A6MDctTWF5LTIwMjA=');
  });
});
