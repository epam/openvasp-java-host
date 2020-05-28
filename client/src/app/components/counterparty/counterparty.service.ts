import { Injectable } from '@angular/core';
import { DataProviderService } from '../../core/services/data-provider/data-provider.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Counterparty } from '../../core/models/counterparty.model';

@Injectable()
export class CounterpartyService {
  constructor(private dataProvider: DataProviderService) {}

  public getCounterparties(): Observable<Counterparty[]> {
    return this.dataProvider.getCounterparties().pipe(
      tap(data => data)
    );
  }

  public getCounterparty(id: number): Observable<Counterparty> {
    return this.dataProvider.getCounterparty(id).pipe(
      tap(data => data)
    );
  }
}
