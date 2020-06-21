import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TransferActionFormService } from './transfer-action.form.service';
import { Transfer } from '../../../core/models/transfer.model';

describe('TransferActionFormService', () => {
  let service: TransferActionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [TransferActionFormService]
    });

    service = TestBed.inject(TransferActionFormService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should init form', () => {
    const transfer: Transfer = {
      amount: 0,
      assetType: '',
      counterpartyVasp: undefined,
      id: 0,
      name: '',
      originator: {id: 1, bic: '', vaan: '', name: ''},
      beneficiary: {id: 1, vaan: '', name: ''},
    };

    service.initForm(transfer);

    expect(service.transferForm.controls.originatorId.value).toEqual(transfer.originator.id);
    expect(service.transferForm.controls.beneficiaryId.value).toEqual(transfer.beneficiary.id);
    expect(service.transferForm.controls.assetType.value).toEqual(transfer.assetType);
    expect(service.transferForm.controls.amount.value).toEqual(transfer.amount);
  });
});
