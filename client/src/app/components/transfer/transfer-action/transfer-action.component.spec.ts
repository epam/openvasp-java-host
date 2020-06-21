import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '../../dialog/dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { TransferActionComponent } from './transfer-action.component';
import { TransferActionFormService } from './transfer-action.form.service';
import { TransferActionService } from './transfer-action.service';
import { CounterpartyService } from '../../counterparty/counterparty.service';
import { TransferDialogData } from '../../../core/models/transfer.model';

describe('TransferActionComponent', () => {
  let component: TransferActionComponent;
  let fixture: ComponentFixture<TransferActionComponent>;
  let dialogService;
  let formService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      declarations: [TransferActionComponent],
      providers: [
        CounterpartyService,
        DialogService,
        TransferActionService,
        TransferActionFormService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();

    dialogService = TestBed.inject(DialogService);
    formService = TestBed.inject(TransferActionFormService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
    const spy = spyOn<any>(component, 'initForm').and.returnValue(of());

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith();
  });

  it('should get counterparties on init', () => {
    const spy = spyOn<any>(component, 'getCounterparties').and.returnValue(of());

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith();
  });


  it('should create transfer on type create', () => {
    const spy = spyOn<any>(component, 'createTransaction').and.returnValue(of());
    const transfer: TransferDialogData = {transfer: undefined, type: 'create'};

    component.transfer = transfer;
    component.transferAction();

    expect(spy).toHaveBeenCalled();
  });

  it('should create transfer on type repeat', () => {
    const spy = spyOn<any>(component, 'createTransaction').and.returnValue(of());
    const transfer: TransferDialogData = {transfer: undefined, type: 'repeat'};

    component.transfer = transfer;
    component.transferAction();

    expect(spy).toHaveBeenCalled();
  });

  it('should edit transfer on type edit', () => {
    const spy = spyOn<any>(component, 'editTransaction').and.returnValue(of());
    const transfer: TransferDialogData = {transfer: undefined, type: 'edit'};

    component.transfer = transfer;
    component.transferAction();

    expect(spy).toHaveBeenCalled();
  });
});
