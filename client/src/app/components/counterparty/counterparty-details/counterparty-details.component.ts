import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DialogService } from '../../../core/services/dialog/dialog.service';
import { Counterparty } from '../../../core/models/counterparty.model';
import { CounterpartyService } from '../counterparty.service';

@Component({
  selector: 'app-counterparty-details',
  templateUrl: './counterparty-details.component.html',
  styleUrls: ['./counterparty-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterpartyDetailsComponent implements OnInit {
  @Input() counterparty: Counterparty;

  // public transferDialogData: TransferDialogData = {transfer: {}, title: ''};
  public counterpartyData: Counterparty;
  public isLoadingResults = true;

  constructor(
    private counterpartyService: CounterpartyService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.counterpartyService.getCounterparty(this.counterparty.id).pipe(
      tap(data => this.setTransferData(data))
    ).subscribe();
  }


  private setTransferData(data: Counterparty): void {
    console.log(data);
    this.counterpartyData = data;
    this.isLoadingResults = false;
    this.cdr.markForCheck();
  }
}
