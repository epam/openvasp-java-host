import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateTransferComponent } from '../transfer/create-transfer/create-transfer.component';
import { DialogService } from '../../core/services/dialog/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(private dialogService: DialogService) {}

  public openTransferDialog(title: string): void {
    this.dialogService.openDialog({title}, CreateTransferComponent).subscribe();
  }
}
