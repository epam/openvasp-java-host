import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transfer } from '../../core/models/transfer.model';
import { TransferService } from './transfer.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-transaction',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource;
  columnsToDisplay = ['trType', 'id', 'created', 'trStatus', 'sessionId'];
  expandedItem: Transfer | null;
  resultsLength: number;
  pageSize: number;

  isLoadingResults = true;

  constructor(
    private transferService: TransferService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.getTransfers(this.paginator.pageIndex, this.paginator.pageSize);
  }

  getPaginatorData(event: PageEvent): void {
    this.getTransfers(event.pageIndex, event.pageSize);
  }

  private getTransfers(pageIndex: number, pageSize: number): void {
    this.transferService.getTransfers(pageIndex, pageSize).pipe(
      tap(data => this.setTransfersData(data))
    ).subscribe();
  }

  private setTransfersData(data): void {
    console.log(JSON.stringify(data));
    // this.pageSize = data.size;
    this.dataSource = new MatTableDataSource<Transfer>(data);
    this.dataSource.sort = this.sort;
    // this.resultsLength = data.totalElements;
    this.isLoadingResults = false;
    this.cdr.markForCheck();
  }
}
