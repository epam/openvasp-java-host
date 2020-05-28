import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Transfer } from '../../models/transfer.model';

@Injectable()
export class DialogService {
  private dialogRef;

  constructor(private dialog: MatDialog) {}

  public openDialog(data: Transfer | {}, component): Observable<string | undefined> {
    this.dialogRef = this.dialog.open(component, {
      height: '400px',
      width: '600px',
      data,
    });

    return this.dialogRef.afterClosed();
  }

  public closeDialog(value?): void {
    this.dialogRef.close(value);
  }
}
