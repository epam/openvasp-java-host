import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransferActionComponent } from '../transfer/transfer-action/transfer-action.component';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(private dialogService: DialogService) {}

  public openTransferDialog(type: string): void {
    this.dialogService.openDialog({type}, TransferActionComponent).subscribe();
  }
}
