import { Injectable } from '@angular/core';
import { DataProviderService } from '../../../core/services/data-provider/data-provider.service';
import { Observable } from 'rxjs';
import { Transfer } from '../../../core/models/transfer.model';

@Injectable()
export class TransferDetailsService {

  constructor(
    private dataProvider: DataProviderService
  ) {}

  public deleteTransfer(id: number): Observable<Transfer> {
    return this.dataProvider.deleteTransfer(id);
  }
}
