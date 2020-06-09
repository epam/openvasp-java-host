import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Transfer } from '../../../core/models/transfer.model';

@Component({
  selector: 'app-transfer-command',
  templateUrl: './transfer-command.component.html',
  styleUrls: ['./transfer-command.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferCommandComponent {
  @Input() transfer: Transfer;
  @Output() command: EventEmitter<string> = new EventEmitter();

  public isRequestSessionAllowed(): boolean {
    return this.transfer.trType === 'OUTGOING' && this.transfer.trStatus !== 'SESSION_CONFIRMED' && this.transfer.trStatus !== 'TRANSFER_ALLOWED';
  }

  public isAcceptSessionAllowed(): boolean {
    return this.transfer.trType === 'INCOMING' && this.transfer.trStatus === 'SESSION_REQUESTED';
  }

  public isDeclineSessionAllowed(): boolean {
    return this.transfer.trType === 'INCOMING' && this.transfer.trStatus === 'SESSION_REQUESTED';
  }

  public isRequestTransferAllowed(): boolean {
    return this.transfer.trType === 'OUTGOING' && this.transfer.trStatus !== 'CREATED' && this.transfer.trStatus !== 'TRANSFER_ALLOWED';
  }

  public isAcceptTransferAllowed(): boolean {
    return this.transfer.trType === 'INCOMING' && this.transfer.trStatus === 'TRANSFER_REQUESTED';
  }

  public isDeclineTransferAllowed(): boolean {
    return this.transfer.trType === 'INCOMING' && this.transfer.trStatus === 'TRANSFER_REQUESTED';
  }

  public isRequestDispatchAllowed(): boolean {
    return this.transfer.trType === 'OUTGOING' && this.transfer.trStatus !== 'CREATED' && this.transfer.trStatus !== 'SESSION_CONFIRMED' && this.transfer.trStatus !== 'TRANSFER_CONFIRMED';
  }

  public isAcceptDispatchAllowed(): boolean {
    return this.transfer.trType === 'INCOMING' && this.transfer.trStatus === 'TRANSFER_DISPATCHED';
  }

  public isDeclineDispatchAllowed(): boolean {
    return this.transfer.trType === 'INCOMING' && this.transfer.trStatus === 'TRANSFER_DISPATCHED';
  }
}
