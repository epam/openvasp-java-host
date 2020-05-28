import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable()
export class DialogService {
  private dialogRef;

  constructor(private dialog: MatDialog) {}

  public openDialog(data: any, component, title?: string, width?: string, height?: string): Observable<string | undefined> {
    data.title = title;
    this.dialogRef = this.dialog.open(component, {
      height: height || '400px',
      width: width || '600px',
      data,
    });

    return this.dialogRef.afterClosed();
  }

  public closeDialog(value?): void {
    this.dialogRef.close(value);
  }
}
