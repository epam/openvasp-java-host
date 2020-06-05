import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransferActionComponent } from '../transfer/transfer-action/transfer-action.component';
import { DialogService } from '../dialog/dialog.service';
import { Router } from '@angular/router';
import { CounterpartyActionComponent } from '../counterparty/counterparty-action/counterparty-action.component';
import { VASPService } from '../vasp/vasp.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public currentVASP: string;

  constructor(
    private dialogService: DialogService,
    private vaspService: VASPService,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.setCurrentVASPInfo();
  }

  public openTransferDialog(type: string): void {
    this.dialogService.openDialog({type}, TransferActionComponent).subscribe();
  }

  public openCounterpartyDialog(type: string): void {
    this.dialogService.openDialog({type}, CounterpartyActionComponent, '', '900px', '900px').subscribe();
  }

  private setCurrentVASPInfo(): void {
    this.vaspService.getCurrentVASP().pipe(
      tap(data => this.currentVASP = data.name),
      tap(() => this.cdr.markForCheck())
    ).subscribe()
  }
}
