import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transfer } from '../../core/models/transfer.model';
import { TransferService } from './transfer.service';
import { MatPaginator  } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferComponent implements AfterViewInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource;
  columnsToDisplay = ['trType', 'id', 'updated', 'trStatus', 'sessionId'];
  expandedItem: Transfer | null;
  resultsLength: number;

  isLoadingResults = true;

  constructor(
    private transferService: TransferService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.getTransfers();
  }

  public onCompletedAction(): void {
    this.getTransfers();
  }

  private getTransfers(): void {
    this.isLoadingResults = true;
    this.transferService.getTransfers().pipe(
      tap(data => this.setTransfersData(data))
    ).subscribe();
  }

  private setTransfersData(data): void {
    this.dataSource = new MatTableDataSource<Transfer>(data);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.resultsLength = data.length;
    this.isLoadingResults = false;
    this.cdr.markForCheck();
  }
}
