import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { filter, switchMap, tap } from 'rxjs/operators';
import { DialogService } from '../../dialog/dialog.service';
import { Counterparty } from '../../../core/models/counterparty.model';
import { CounterpartyService } from '../counterparty.service';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';
import { CounterpartyActionComponent } from '../counterparty-action/counterparty-action.component';

@Component({
  selector: 'app-counterparty-details',
  templateUrl: './counterparty-details.component.html',
  styleUrls: ['./counterparty-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterpartyDetailsComponent implements OnInit {
  @Input() counterparty: Counterparty;
  @Output() completedAction: EventEmitter<boolean> = new EventEmitter();

  public counterpartyData: Counterparty;
  public isLoadingResults = true;

  constructor(
    private counterpartyService: CounterpartyService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCounterparty();
  }

  openCounterpartyDialog(type: string): void {
    this.dialogService.openDialog({type}, CounterpartyActionComponent, '', '900px', '850px').subscribe();
  }

  public openDeleteDialog(): void {
    this.dialogService.openDialog({}, DialogConfirmComponent, 'Are you sure you want to delete?', '400px', '150px').pipe(
      filter(data => Boolean(data)),
      switchMap(() => this.counterpartyService.deleteCounterparty(this.counterparty.id)),
      tap(() => this.completedAction.emit(true)),
    ).subscribe();
  }

  private getCounterparty(): void {
    this.counterpartyService.getCounterparty(this.counterparty?.id).pipe(
      tap(data => this.setCounterpartyData(data))
    ).subscribe();
  }

  private setCounterpartyData(data: Counterparty): void {
    this.counterpartyData = data;
    this.isLoadingResults = false;
    this.cdr.markForCheck();
  }
}
