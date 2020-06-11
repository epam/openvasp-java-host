import { TestBed } from '@angular/core/testing';
import { DataProviderService } from '../../core/services/data-provider/data-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { CounterpartyService } from './counterparty.service';
import { Counterparty } from '../../core/models/counterparty.model';

describe('CounterpartyService', () => {
  let service: CounterpartyService;
  let dataProvider: DataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        CounterpartyService,
        DataProviderService
      ]
    });

    service = TestBed.inject(CounterpartyService);
    dataProvider = TestBed.inject(DataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should get counterparties', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'getCounterparties').and.returnValue(of());

    service.getCounterparties();

    expect(dataProviderSpy).toHaveBeenCalled();
  });

  it('should get counterparty', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'getCounterparty').and.returnValue(of());
    const id = 1;

    service.getCounterparty(id);

    expect(dataProviderSpy).toHaveBeenCalledWith(id);
  });

  it('should edit counterparty', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'editCounterparty').and.returnValue(of());
    const counterparty: Counterparty = {id: 1, name: 'test', vaspCode: 'test'};
    const id = 1;

    service.editCounterparty(id, counterparty);

    expect(dataProviderSpy).toHaveBeenCalledWith(id, counterparty);
  });

  it('should delete counterparty', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'deleteCounterparty').and.returnValue(of());
    const id = 1;

    service.deleteCounterparty(id);

    expect(dataProviderSpy).toHaveBeenCalledWith(id);
  });

  it('should create counterparty', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'createCounterparty').and.returnValue(of());
    const counterparty: Counterparty = {id: 1, name: 'test', vaspCode: 'test'};

    service.createCounterparty(counterparty);

    expect(dataProviderSpy).toHaveBeenCalledWith(counterparty);
  });
});
