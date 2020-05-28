import { Injectable } from '@angular/core';
import { CounterpartyService } from '../../counterparty/counterparty.service';
import { Counterparty } from '../../../core/models/counterparty.model';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateTransferData, Transfer } from '../../../core/models/transfer.model';
import { DataProviderService } from '../../../core/services/data-provider/data-provider.service';

@Injectable()
export class CreateTransferService {
  private counterparties = new BehaviorSubject<Counterparty[]>(undefined);

  public counterparties$ = this.counterparties.asObservable();

  constructor(
    private counterpartyService: CounterpartyService,
    private dataProvider: DataProviderService
  ) {}

  public getCounterparties(): void {
    this.counterpartyService.getCounterparties().pipe(
      tap(data => this.counterparties.next(data))
    ).subscribe();
  }

  public createTransfer(data: CreateTransferData): Observable<Transfer> {
    return this.dataProvider.createTransfer(data);
  }
}
