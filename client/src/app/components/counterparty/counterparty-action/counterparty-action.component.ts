import { ChangeDetectionStrategy, Component, Inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Counterparty, CounterpartyDialogData } from '../../../core/models/counterparty.model';
import { CounterpartyActionFormService } from './counterparty-action.form.service';
import { switchMap, tap } from 'rxjs/operators';
import { CounterpartyService } from '../counterparty.service';
import { DialogService } from '../../dialog/dialog.service';
import {
  COUNTERPARTY_ROLES,
  COUNTERPARTY_TYPES,
  JUR_ID_TYPES,
  NAT_ID_TYPES
} from '../../../core/models/nat-jur-counterparty-types.data';
import { COUNTRIES } from '../../../core/models/countries.data';
import { VASPService } from '../../vasp/vasp.service';
import { VASP } from '../../../core/models/vasp.model';

@Component({
  selector: 'app-counterparty-action',
  templateUrl: './counterparty-action.component.html',
  styleUrls: ['./counterparty-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterpartyActionComponent implements OnInit, OnDestroy {
  public counterpartyRoles = COUNTERPARTY_ROLES;
  public counterpartyTypes = COUNTERPARTY_TYPES;
  public natIdTypes = NAT_ID_TYPES;
  public jurIdTypes = JUR_ID_TYPES;
  public countries = COUNTRIES;
  public currentVASP: VASP;

  constructor(
    private counterpartyService: CounterpartyService,
    private counterpartyActionFormService: CounterpartyActionFormService,
    private vaspService: VASPService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public counterparty: CounterpartyDialogData
  ) {
  }

  get counterpartyForm() {
    return this.counterpartyActionFormService.counterpartyForm;
  }

  ngOnInit(): void {
    this.initForm(this.counterparty.type);
    this.getCurrentVASP();
  }

  ngOnDestroy(): void {
    this.counterpartyForm.reset();
  }

  public counterpartyAction(): void {
    switch (this.counterparty.type) {
      case 'create':
        this.createCounterparty();
        break;
      case 'edit':
        this.editCounterparty();
        break;
    }
  }

  private createCounterparty(): void {
    this.vaspService.getVAAN(this.currentVASP.vaspCode, this.counterpartyForm.value.customerNr).pipe(
      tap(data => this.setVAAN(data)),
      tap(() => this.counterpartyActionFormService.processBeforeSend()),
      switchMap(() => this.counterpartyService.createCounterparty(this.counterpartyForm.value).pipe(
        tap(() => this.dialogService.closeDialog(true)),
      ))
    ).subscribe()
  }

  private editCounterparty(): void {
    this.counterpartyActionFormService.processBeforeSend();
    this.counterpartyService.editCounterparty((this.counterparty.counterparty as Counterparty).id, this.counterpartyForm.value).pipe(
      tap(() => this.dialogService.closeDialog(true))
    ).subscribe();
  }

  private getCurrentVASP(): void {
    this.vaspService.getCurrentVASP().pipe(
      tap(data => this.currentVASP = data)
    ).subscribe();
  }

  private setVAAN(vaan: string): void {
    this.counterpartyActionFormService.setVAAN(vaan);
  }

  private initForm(type: string): void {
    this.counterpartyActionFormService.initForm(type, this.counterparty.counterparty);
    this.cdr.markForCheck();
  }
}
