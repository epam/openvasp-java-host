import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transfer } from '../../../core/models/transfer.model';

@Component({
  selector: 'app-transfer-command',
  templateUrl: './transfer-command.component.html',
  styleUrls: ['./transfer-command.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferCommandComponent implements OnInit {
  @Input() transfer: Transfer;
  @Output() command: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    console.log(this.transfer);
  }
}
