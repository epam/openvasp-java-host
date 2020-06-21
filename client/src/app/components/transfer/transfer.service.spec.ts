import { TestBed } from '@angular/core/testing';
import { DataProviderService } from '../../core/services/data-provider/data-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { TransferService } from './transfer.service';

describe('TransferService', () => {
  let service: TransferService;
  let dataProvider: DataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        TransferService,
        DataProviderService
      ]
    });

    service = TestBed.inject(TransferService);
    dataProvider = TestBed.inject(DataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should get transfers', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'getTransfers').and.returnValue(of());

    service.getTransfers();

    expect(dataProviderSpy).toHaveBeenCalled();
  });

  it('should get transfer', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'getTransfer').and.returnValue(of());
    const id = 1;

    service.getTransfer(id);

    expect(dataProviderSpy).toHaveBeenCalledWith(id);
  });
});
