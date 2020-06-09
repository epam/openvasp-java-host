import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { DataProviderService } from './data-provider.service';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateTransferData, Transfer } from '../../models/transfer.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DataProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [DataProviderService]
    });
  });

  it('should get transfers', inject(
    [HttpTestingController, DataProviderService],
    (httpMock: HttpTestingController, dataService: DataProviderService) => {
      const transfers: Transfer[] = [{
        amount: 1,
        assetType: 'BTC',
        beneficiary: {id: 5, name: 'test', vaan: 'test'},
        counterpartyVasp: {id: "0x08fda931d64b17c3acffb35c1b3902e0bbb4ee5c", vaspCode: "bbb4ee5c", name: "VASP-2"},
        name: "VASP-2",
        vaspCode: "bbb4ee5c",
        created: "2020-06-05T06:10:28.368",
        id: 10000,
        originator: {id: 2, name: 'test', vaan: 'test', bic: 'test'},
        sessionId: "0x0ddc6e6dc46b52dc8ef8c33a5eaedd45",
        trStatus: "SESSION_REQUESTED",
        trType: "INCOMING",
        updated: "2020-06-05T06:10:28.368"
      }];

      dataService.getTransfers().pipe(
        tap(data => expect(data).toEqual(transfers))
      ).subscribe();

      const mockReq = httpMock.expectOne(environment.apiUrl + 'transfers');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(transfers);
      httpMock.verify();
    }
  ));

  it('should get transfer by id', inject(
    [HttpTestingController, DataProviderService],
    (httpMock: HttpTestingController, dataService: DataProviderService) => {
      const transfer: Transfer = {
        amount: 1,
        assetType: 'BTC',
        beneficiary: {id: 5, name: 'test', vaan: 'test'},
        counterpartyVasp: {id: "0x08fda931d64b17c3acffb35c1b3902e0bbb4ee5c", vaspCode: "bbb4ee5c", name: "VASP-2"},
        name: "VASP-2",
        vaspCode: "bbb4ee5c",
        created: "2020-06-05T06:10:28.368",
        id: 10000,
        originator: {id: 2, name: 'test', vaan: 'test', bic: 'test'},
        sessionId: "0x0ddc6e6dc46b52dc8ef8c33a5eaedd45",
        trStatus: "SESSION_REQUESTED",
        trType: "INCOMING",
        updated: "2020-06-05T06:10:28.368"
      };

      dataService.getTransfer(10000).pipe(
        tap(data => expect(data).toEqual(transfer))
      ).subscribe();

      const mockReq = httpMock.expectOne(environment.apiUrl + `transfers/10000`);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(transfer);
      httpMock.verify();
    }
  ));

  it('should create transfer', inject(
    [HttpTestingController, DataProviderService],
    (httpMock: HttpTestingController, dataService: DataProviderService) => {
      const response: Transfer = {
        amount: 1,
        assetType: 'BTC',
        beneficiary: {id: 5, name: 'test', vaan: 'test'},
        counterpartyVasp: {id: "0x08fda931d64b17c3acffb35c1b3902e0bbb4ee5c", vaspCode: "bbb4ee5c", name: "VASP-2"},
        name: "VASP-2",
        vaspCode: "bbb4ee5c",
        created: "2020-06-05T06:10:28.368",
        id: 10000,
        originator: {id: 2, name: 'test', vaan: 'test', bic: 'test'},
        sessionId: "0x0ddc6e6dc46b52dc8ef8c33a5eaedd45",
        trStatus: "SESSION_REQUESTED",
        trType: "INCOMING",
        updated: "2020-06-05T06:10:28.368"
      };
      const transferData: CreateTransferData = {amount: 1, asset: 'BTC', beneficiaryId: 5, destAddr: '', originatorId: 2, sendAddr: '', txHash: ''};

      dataService.createTransfer(transferData).pipe(
        tap(data => expect(data).toEqual(response))
      ).subscribe();

      const mockReq = httpMock.expectOne(environment.apiUrl + `transfers`);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(response);
      httpMock.verify();
    }
  ));

  it('should edit transfer', inject(
    [HttpTestingController, DataProviderService],
    (httpMock: HttpTestingController, dataService: DataProviderService) => {
      const response: Transfer = {
        amount: 2,
        assetType: 'BTC',
        beneficiary: {id: 5, name: 'test', vaan: 'test'},
        counterpartyVasp: {id: "0x08fda931d64b17c3acffb35c1b3902e0bbb4ee5c", vaspCode: "bbb4ee5c", name: "VASP-2"},
        name: "VASP-2",
        vaspCode: "bbb4ee5c",
        created: "2020-06-05T06:10:28.368",
        id: 10000,
        originator: {id: 2, name: 'test', vaan: 'test', bic: 'test'},
        sessionId: "0x0ddc6e6dc46b52dc8ef8c33a5eaedd45",
        trStatus: "SESSION_REQUESTED",
        trType: "INCOMING",
        updated: "2020-06-05T06:10:28.368"
      };
      const transferData: CreateTransferData = {amount: 2, asset: 'BTC', beneficiaryId: 5, destAddr: '', originatorId: 2, sendAddr: '', txHash: ''};

      dataService.editTransfer(10000, transferData).pipe(
        tap(data => expect(data).toEqual(response))
      ).subscribe();

      const mockReq = httpMock.expectOne(environment.apiUrl + `transfers/10000`);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(response);
      httpMock.verify();
    }
  ));

  it('should delete transfer', inject(
    [HttpTestingController, DataProviderService],
    (httpMock: HttpTestingController, dataService: DataProviderService) => {
      dataService.deleteTransfer(10000).pipe(
        tap(data => expect(data).toEqual(null))
      ).subscribe();

      const mockReq = httpMock.expectOne(environment.apiUrl + `transfers/10000`);

      expect(mockReq.cancelled).toBeFalsy();

      httpMock.verify();
    }
  ));

  it('should command transfer', inject(
    [HttpTestingController, DataProviderService],
    (httpMock: HttpTestingController, dataService: DataProviderService) => {
      const response: Transfer = {
        amount: 2,
        assetType: 'BTC',
        beneficiary: {id: 5, name: 'test', vaan: 'test'},
        counterpartyVasp: {id: "0x08fda931d64b17c3acffb35c1b3902e0bbb4ee5c", vaspCode: "bbb4ee5c", name: "VASP-2"},
        name: "VASP-2",
        vaspCode: "bbb4ee5c",
        created: "2020-06-05T06:10:28.368",
        id: 10000,
        originator: {id: 2, name: 'test', vaan: 'test', bic: 'test'},
        sessionId: "0x0ddc6e6dc46b52dc8ef8c33a5eaedd45",
        trStatus: "TRANSFER_ALLOWED",
        trType: "INCOMING",
        updated: "2020-06-05T06:10:28.368"
      };

      dataService.commandTransfer(10000, 'ACCEPT_TRANSFER').pipe(
        tap(data => expect(data).toEqual(response))
      ).subscribe();

      const mockReq = httpMock.expectOne(environment.apiUrl + `transfers/10000/command/ACCEPT_TRANSFER`);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush(response);
      httpMock.verify();
    }
  ));
});

