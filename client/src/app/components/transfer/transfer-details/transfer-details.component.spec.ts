import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { TransferDetailsComponent } from './transfer-details.component';
import { TransferService } from '../transfer.service';
import { DialogService } from '../../dialog/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { TransferDetailsService } from './transfer-details.service';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';
import { Transfer, TransferDialogData } from '../../../core/models/transfer.model';
import { TransferActionComponent } from '../transfer-action/transfer-action.component';

describe('TransferDetailsComponent', () => {
  let component: TransferDetailsComponent;
  let fixture: ComponentFixture<TransferDetailsComponent>;
  let transferService;
  let transferDetailsService;
  let dialogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      declarations: [TransferDetailsComponent],
      providers: [
        TransferService,
        TransferDetailsService,
        DialogService
      ]
    }).compileComponents();

    dialogService = TestBed.inject(DialogService);
    transferService = TestBed.inject(TransferService);
    transferDetailsService = TestBed.inject(TransferDetailsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get transfer after init', () => {
    const spy = spyOn<any>(component, 'getTransfer').and.returnValue(of());

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should open transfer dialog', () => {
    const dialogSpy = spyOn<any>(dialogService, 'openDialog').and.returnValue(of());
    const type = 'edit';
    const transfer: TransferDialogData = {transfer: undefined, type: ''};

    component.transferDialogData = transfer;

    component.openTransferDialog(type);

    expect(dialogSpy).toHaveBeenCalledWith(transfer, TransferActionComponent);
  });

  it('should open delete dialog', () => {
    const dialogSpy = spyOn<any>(dialogService, 'openDialog').and.returnValue(of());
    const transfer: TransferDialogData = {transfer: undefined, type: ''};

    component.transferDialogData = transfer;
    component.openDeleteDialog();

    expect(dialogSpy).toHaveBeenCalledWith(transfer, DialogConfirmComponent, 'Are you sure you want to delete?', '400px', '150px');
  });

  it('should open command dialog', () => {
    const dialogSpy = spyOn<any>(dialogService, 'openDialog').and.returnValue(of());
    const type = 'REQUEST_TRANSFER';
    const transfer: TransferDialogData = {transfer: undefined, type: ''};

    component.transferDialogData = transfer;

    component.onCommandClick(type);

    expect(dialogSpy).toHaveBeenCalledWith(transfer, DialogConfirmComponent, `Are you sure you want to ${type}?`, '600px', '150px');
  });

  it('should allow transfer command', () => {
    const transfer: Transfer = {
      amount: 0,
      assetType: '',
      beneficiary: undefined,
      counterpartyVasp: undefined,
      id: 0,
      name: '',
      trStatus: 'REQUEST_TRANSFER'
    };

    component.transfer = transfer;

    expect(component.isCommandAllowed()).toBe(true)
  });

  it('should not allow transfer command', () => {
    const transfer: Transfer = {
      amount: 0,
      assetType: '',
      beneficiary: undefined,
      counterpartyVasp: undefined,
      id: 0,
      name: '',
      trStatus: 'DISPATCH_CONFIRMED'
    };

    component.transfer = transfer;

    expect(component.isCommandAllowed()).toBe(false)
  });
});
