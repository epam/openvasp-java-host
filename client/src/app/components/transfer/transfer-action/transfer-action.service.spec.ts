import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { TransferActionService } from './transfer-action.service';
import { DataProviderService } from '../../../core/services/data-provider/data-provider.service';
import { CreateTransferData } from '../../../core/models/transfer.model';
import { CounterpartyService } from '../../counterparty/counterparty.service';

describe('TransferActionService', () => {
  let service: TransferActionService;
  let dataProvider: DataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        TransferActionService,
        DataProviderService,
        CounterpartyService
      ]
    });

    service = TestBed.inject(TransferActionService);
    dataProvider = TestBed.inject(DataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should get counterparties', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'getCounterparties').and.returnValue(of());

    service.getCounterparties();

    expect(dataProviderSpy).toHaveBeenCalled();
  });

  it('should create transfer', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'createTransfer').and.returnValue(of());
    const transfer: CreateTransferData = {
      amount: 0,
      asset: '',
      beneficiaryId: 0,
      destAddr: '',
      originatorId: 0,
      sendAddr: '',
      txHash: ''
    };

    service.createTransfer(transfer);

    expect(dataProviderSpy).toHaveBeenCalledWith(transfer);
  });

  it('should edit transfer', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'editTransfer').and.returnValue(of());
    const counterparty: CreateTransferData = {
      amount: 0,
      asset: '',
      beneficiaryId: 0,
      destAddr: '',
      originatorId: 0,
      sendAddr: '',
      txHash: ''
    };
    const id = 1;

    service.editTransfer(id, counterparty);

    expect(dataProviderSpy).toHaveBeenCalledWith(id, counterparty);
  });
});
