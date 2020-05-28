import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TransferActionComponent } from '../transfer-action/transfer-action.component';
import { tap } from 'rxjs/operators';
import { DialogService } from '../../dialog/dialog.service';
import { TransferService } from '../transfer.service';
import { Transfer, TransferDialogData } from '../../../core/models/transfer.model';

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferDetailsComponent implements OnInit {
  @Input() transfer: Transfer;

  public transferDialogData: TransferDialogData = {transfer: {}, type: ''};
  public isLoadingResults = true;

  constructor(private dialogService: DialogService,
              private transferService: TransferService,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.transferService.getTransfer(this.transfer.id).pipe(
      tap(data => this.setTransferData(data))
    ).subscribe();
  }

  public openTransferDialog(type: string): void {
    this.transferDialogData.type = type;
    this.dialogService.openDialog(this.transferDialogData, TransferActionComponent).pipe(
      tap(data => data)
    ).subscribe();
  }

  public openDeleteDialog(): void {
    // this.dialogService.openDialog()
  }

  private setTransferData(data: Transfer): void {
    this.isLoadingResults = false;
    this.transferDialogData.transfer = data;
    this.cdr.markForCheck();
  }
}
