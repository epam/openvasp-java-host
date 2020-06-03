import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Counterparty, CounterpartyDialogData } from '../../../core/models/counterparty.model';
import { CounterpartyActionFormService } from './counterparty-action.form';
import { tap } from 'rxjs/operators';
import { CounterpartyService } from '../counterparty.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../../dialog/dialog.service';
import { COUNTERPARTY_TYPES, JUR_ID_TYPES, NAT_ID_TYPES } from '../../../core/models/nat-jur-counterparty-types.data';

@Component({
  selector: 'app-counterparty-action',
  templateUrl: './counterparty-action.component.html',
  styleUrls: ['./counterparty-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterpartyActionComponent implements OnInit {
  public counterpartyTypes = COUNTERPARTY_TYPES;
  public natIdTypes = NAT_ID_TYPES;
  public jurIdTypes = JUR_ID_TYPES;

  constructor(
    private counterpartyService: CounterpartyService,
    private counterpartyActionFormService: CounterpartyActionFormService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public counterparty: CounterpartyDialogData
  ) {}

  get counterpartyForm() {
    return this.counterpartyActionFormService.counterpartyForm;
  }

  ngOnInit(): void {
    console.log(this.counterparty);
  }

  public counterpartyAction(): void {
    switch (this.counterparty.type) {
      case 'create':
        this.createCounterparty();
        break;
      case 'repeat':
        this.createCounterparty();
        break;
      case 'edit':
        this.editCounterparty();
        break;
    }
  }

  private createCounterparty(): void {
    console.log(this.counterpartyForm.value);
    // this.counterpartyService.createCounterparty(this.counterpartyForm.value).pipe(
    //   tap(() => this.snackBar.open('Counterparty was created', 'Close')),
    //   tap(() => this.dialogService.closeDialog(true))
    // ).subscribe();
  }

  private editCounterparty(): void {
    this.counterpartyService.editCounterparty((this.counterparty.counterparty as Counterparty).id, this.counterpartyForm.value).pipe(
      tap(() => this.snackBar.open('Counterparty was edited', 'Close')),
      tap(() => this.dialogService.closeDialog(true))
    ).subscribe();
  }
}
