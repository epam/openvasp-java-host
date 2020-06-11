import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { CounterpartyService } from './counterparty.service';
import { Counterparty } from '../../core/models/counterparty.model';

@Component({
  selector: 'app-counterparty',
  templateUrl: './counterparty.component.html',
  styleUrls: ['./counterparty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterpartyComponent implements AfterViewInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource;
  columnsToDisplay = ['id', 'name', 'type', 'role', 'vaan'];
  expandedItem: Counterparty | null;
  resultsLength: number;

  isLoadingResults = true;

  constructor(
    private counterpartyService: CounterpartyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.getCounterparties();
  }

  public onCompletedAction(): void {
    this.getCounterparties();
  }

  private getCounterparties(): void {
    this.counterpartyService.getCounterparties().pipe(
      tap(data => this.setCounterpartiesData(data))
    ).subscribe();
  }

  private setCounterpartiesData(data: Counterparty[]): void {
    this.dataSource = new MatTableDataSource<Counterparty>(data);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.resultsLength = data.length;
    this.isLoadingResults = false;
    this.cdr.markForCheck();
  }
}
