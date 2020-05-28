import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from '../../dialog/dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transfer, TransferDialogData } from '../../../core/models/transfer.model';
import { TransferActionFormService } from './transfer-action.form.service';
import { TransferActionService } from './transfer-action.service';
import { ASSETS } from '../../../core/models/asset-types.data';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-transfer',
  templateUrl: './transfer-action.component.html',
  styleUrls: ['./transfer-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferActionComponent implements OnInit, OnDestroy {
  public assets = ASSETS;

  constructor(private dialogService: DialogService,
              private createTransferFormService: TransferActionFormService,
              private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar,
              public createTransferService: TransferActionService,
              @Inject(MAT_DIALOG_DATA) public transfer: TransferDialogData) {}

  get transferForm() {
    return this.createTransferFormService.transferForm;
  }

  ngOnInit(): void {
    this.initForm();
    this.getCounterparties();
  }

  ngOnDestroy(): void {
    this.transferForm.reset();
  }

  public transferAction(): void {
    switch (this.transfer.type) {
      case 'create':
        this.createTransaction();
        break;
      case 'repeat':
        this.createTransaction();
        break;
      case 'edit':
        this.editTransaction();
        break;
    }
  }

  private createTransaction(): void {
    this.createTransferService.createTransfer(this.transferForm.value).pipe(
      tap(() => this.snackBar.open('Transfer was created', 'Close')),
      tap(() => this.dialogService.closeDialog(true))
    ).subscribe();
  }

  private editTransaction(): void {
    this.createTransferService.editTransfer((this.transfer.transfer as Transfer).id, this.transferForm.value).pipe(
      tap(() => this.snackBar.open('Transfer was edited', 'Close')),
      tap(() => this.dialogService.closeDialog(true))
    ).subscribe();
  }

  private getCounterparties(): void {
    this.createTransferService.getCounterparties();
  }

  private initForm(): void {
    this.createTransferFormService.initForm(this.transfer.transfer);
    this.cdr.markForCheck();
  }
}
