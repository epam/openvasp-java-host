import { Injectable } from '@angular/core';
import { DataProviderService } from '../../core/services/data-provider/data-provider.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Transfer, TransferResponse } from '../../core/models/transfer.model';

@Injectable()
export class TransferService {
  constructor(private dataProvider: DataProviderService) {}

  public getTransfers(pageNumber: number, pageSize: number): Observable<TransferResponse> {
    return this.dataProvider.getTransfers(pageNumber, pageSize).pipe(
      tap(data => data.content)
    );
  }

  public getTransfer(id: number): Observable<Transfer> {
    return this.dataProvider.getTransfer(id).pipe(
      tap(data => data)
    );
  }
}
