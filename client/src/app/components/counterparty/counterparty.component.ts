import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
export class CounterpartyComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource;
  columnsToDisplay = ['id', 'name', 'type', 'vaan'];
  expandedItem: Counterparty | null;
  resultsLength: number;
  pageSize: number;

  isLoadingResults = true;

  constructor(
    private counterpartyService: CounterpartyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.getCounterparties();
  }

  getPaginatorData(event: PageEvent): void {
    this.getCounterparties();
  }

  private getCounterparties(): void {
    this.counterpartyService.getCounterparties().pipe(
      tap(data => this.setCounterpartiesData(data))
    ).subscribe();
  }

  private setCounterpartiesData(data: Counterparty[]): void {
    // this.pageSize = data.size;
    this.dataSource = new MatTableDataSource<Counterparty>(data);
    console.log(data);
    this.dataSource.sort = this.sort;
    // this.resultsLength = data.totalElements;
    this.isLoadingResults = false;
    this.cdr.markForCheck();
  }
}
