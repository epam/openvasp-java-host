import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CreateTransferComponent } from '../create-transfer/create-transfer.component';
import { tap } from 'rxjs/operators';
import { DialogService } from '../../../core/services/dialog/dialog.service';
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

  public transferDialogData: TransferDialogData = {transfer: {}, title: ''};
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

  public openTransferDialog(title: string): void {
    this.transferDialogData.title = title;
    this.dialogService.openDialog(this.transferDialogData, CreateTransferComponent).pipe(
      tap(data => data)
    ).subscribe();
  }

  private setTransferData(data: Transfer): void {
    this.transferDialogData.transfer = data;
    this.isLoadingResults = false;
    this.cdr.markForCheck();
  }
}
