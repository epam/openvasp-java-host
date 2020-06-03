import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { TransferActionComponent } from '../transfer-action/transfer-action.component';
import { filter, switchMap, tap } from 'rxjs/operators';
import { DialogService } from '../../dialog/dialog.service';
import { TransferService } from '../transfer.service';
import { Transfer, TransferDialogData } from '../../../core/models/transfer.model';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';
import { TransferDetailsService } from './transfer-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferDetailsComponent implements OnInit {
  @Input() transfer: Transfer;
  @Output() completedAction: EventEmitter<boolean> = new EventEmitter();

  public transferDialogData: TransferDialogData = {transfer: {}, type: ''};
  public isLoadingResults = true;

  constructor(private dialogService: DialogService,
              private transferService: TransferService,
              private transferDetailsService: TransferDetailsService,
              private snackBar: MatSnackBar,
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
      filter(data => Boolean(data)),
      tap(() => this.completedAction.emit(true)),
    ).subscribe();
  }

  public openDeleteDialog(): void {
    this.dialogService.openDialog(this.transferDialogData, DialogConfirmComponent, 'Are you sure you want to delete?', '400px', '150px').pipe(
      filter(data => Boolean(data)),
      switchMap(() => this.transferDetailsService.deleteTransfer(this.transfer.id)),
      tap(() => this.completedAction.emit(true)),
    ).subscribe();
  }

  public onCommandClick(event): void {
    this.dialogService.openDialog(this.transferDialogData, DialogConfirmComponent, `Are you sure you want to ${event}?`, '600px', '150px').pipe(
      filter(data => Boolean(data)),
      switchMap(() => this.transferDetailsService.commandTransfer(this.transfer.id, event)),
      tap(() => this.completedAction.emit(true))
    ).subscribe();
  }

  private setTransferData(data: Transfer): void {
    this.isLoadingResults = false;
    this.transferDialogData.transfer = data;
    this.cdr.markForCheck();
  }
}
