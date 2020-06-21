import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { TransferDetailsService } from './transfer-details.service';
import { DataProviderService } from '../../../core/services/data-provider/data-provider.service';

describe('TransferService', () => {
  let service: TransferDetailsService;
  let dataProvider: DataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        TransferDetailsService,
        DataProviderService
      ]
    });

    service = TestBed.inject(TransferDetailsService);
    dataProvider = TestBed.inject(DataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should delete transfer', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'deleteTransfer').and.returnValue(of());
    const id = 10001;

    service.deleteTransfer(id);

    expect(dataProviderSpy).toHaveBeenCalledWith(id);
  });

  it('should command transfer', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'commandTransfer').and.returnValue(of());
    const id = 1;
    const command = 'REQUEST_TRANSFER';

    service.commandTransfer(id, command);

    expect(dataProviderSpy).toHaveBeenCalledWith(id, command);
  });
});
