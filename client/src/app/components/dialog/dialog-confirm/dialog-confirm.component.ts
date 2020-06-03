import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogConfirmComponent {
  constructor(
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  public confirm(): void {
    this.dialogService.closeDialog(true)
  }
}
