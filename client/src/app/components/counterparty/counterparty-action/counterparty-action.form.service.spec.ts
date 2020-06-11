import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CounterpartyActionFormService } from './counterparty-action.form.service';
import { Counterparty } from '../../../core/models/counterparty.model';

describe('CounterpartyActionFormService', () => {
  let service: CounterpartyActionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [CounterpartyActionFormService]
    });

    service = TestBed.inject(CounterpartyActionFormService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should set VAAN', () => {
    const vaan = 'test';

    service.setVAAN(vaan);

    expect(service.counterpartyForm.controls.vaan.value).toEqual(vaan);
  });

  it('should process form before sending it', () => {
    const date = new Date('Thu Jun 11 2020 13:29:47 GMT+0300 (Eastern European Summer Time)');

    service.counterpartyForm.controls.birth.controls.birthDate.setValue(date);
    service.processBeforeSend();

    expect(service.counterpartyForm.controls.birth.controls.birthDate.value).toEqual('2020-06-11');
    expect(service.counterpartyForm.controls.customerNr).toEqual(undefined);
  });

  it('should remove customerNr if it is edit type', () => {
    const type = 'edit';
    const counterparty: Counterparty = {
      bic: '',
      birth: {birthCountry: '', birthDate: '', birthTown: ''},
      id: 1,
      jurIds: [],
      name: '',
      natIds: [],
      postalAddress: {adrline: '', country: '', number: '', postCode: '', street: '', town: ''},
      role: '',
      type: '',
      vaan: '',
      vaspCode: ''
    };

    service.initForm(type, counterparty);

    expect(service.counterpartyForm.controls.customerNr).toEqual(undefined);
  });

  it('should init form and dont remove customerNr', () => {
    const counterparty: Counterparty = {
      bic: '',
      birth: {birthCountry: '', birthDate: '', birthTown: ''},
      id: 1,
      jurIds: [],
      name: '',
      natIds: [],
      postalAddress: {adrline: '', country: '', number: '', postCode: '', street: '', town: ''},
      role: '',
      type: '',
      vaan: '',
      vaspCode: ''
    };

    service.initForm('create', counterparty);

    expect(service.counterpartyForm.controls.customerNr).toBeDefined();
  });
});
