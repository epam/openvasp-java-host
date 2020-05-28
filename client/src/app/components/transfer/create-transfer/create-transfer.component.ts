import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DialogService } from '../../../core/services/dialog/dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transfer, TransferDialogData } from '../../../core/models/transfer.model';
import { CreateTransferFormService } from './create-transfer.form.service';
import { CreateTransferService } from './create-transfer.service';
import { ASSETS } from '../../../core/models/asset-types.data';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-transfer',
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTransferComponent implements OnInit {
  public assets = ASSETS;

  constructor(private dialogService: DialogService,
              private createTransferFormService: CreateTransferFormService,
              private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar,
              public createTransferService: CreateTransferService,
              @Inject(MAT_DIALOG_DATA) public transfer: TransferDialogData) {}

  get transferForm() {
    return this.createTransferFormService.transferForm;
  }

  ngOnInit(): void {
    this.initForm();
    this.getCounterparties();
  }

  createTransaction(): void {
    this.createTransferService.createTransfer(this.transferForm.value).pipe(
      tap(() => this.snackBar.open('Transaction was created', 'Close')),
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
