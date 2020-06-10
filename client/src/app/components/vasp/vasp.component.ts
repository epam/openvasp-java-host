import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VASPService } from './vasp.service';
import { tap } from 'rxjs/operators';
import { VASP } from '../../core/models/vasp.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-vasp',
  templateUrl: './vasp.component.html',
  styleUrls: ['./vasp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VASPComponent implements OnInit {
  public isLoadingResults = true;
  public dataSource;
  public columnsToDisplay = ['id', 'vaspCode', 'name'];

  constructor(
    private vaspService: VASPService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.vaspService.getVASPs().pipe(
      tap(data => this.setVASPs(data))
    ).subscribe();
  };

  private setVASPs(data: VASP[]): void {
    this.dataSource = new MatTableDataSource<VASP>(data);
    this.cdr.markForCheck();
  }
}
