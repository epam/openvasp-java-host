import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CreateTransferData, Transfer, TransferResponse } from '../../models/transfer.model';
import { Counterparty } from '../../models/counterparty.model';
import { VASP } from '../../models/vasp.model';
import { MatSnackBar } from '@angular/material/snack-bar';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  public getTransfers(): Observable<TransferResponse> {
    return this.http.get(API_URL + 'transfers').pipe(
      map(this.extractData),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('transfers'))
    );
  }

  public getTransfer(id: number): Observable<Transfer> {
    return this.http.get(API_URL + `transfers/${id}`).pipe(
      map(this.extractData),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('transfers'))
    );
  }

  public createTransfer(data: CreateTransferData): Observable<Transfer> {
    return this.http.post(API_URL + 'transfers', data).pipe(
      map(this.extractData),
      tap(() => this.snackBar.open('Transfer was created', 'Close')),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('create transfer'))
    );
  }

  public editTransfer(id: number, data: CreateTransferData): Observable<Transfer> {
    return this.http.put(API_URL + `transfers/${id}`, data).pipe(
      map(this.extractData),
      tap(() => this.snackBar.open('Transfer was edited', 'Close')),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('edit transfer'))
    );
  }

  public deleteTransfer(id: number): Observable<Transfer> {
    return this.http.delete(API_URL + `transfers/${id}`).pipe(
      map(this.extractData),
      tap(() => this.snackBar.open('Transfer was deleted', 'Close')),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('delete transfer'))
    );
  }

  public commandTransfer(id: number, command: string): Observable<Transfer> {
    return this.http.post(API_URL + `transfers/${id}/command/${command}`, {}).pipe(
      map(this.extractData),
      tap(() => this.snackBar.open(`${command} was sent`, 'Close')),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('command transfer'))
    )
  }

  public getCounterparties(): Observable<Counterparty[]> {
    return this.http.get(API_URL + 'counterparties').pipe(
      map(this.extractData),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('counterparties'))
    );
  }

  public getCounterparty(id: number): Observable<Counterparty> {
    return this.http.get(API_URL + 'counterparties/' + id).pipe(
      map(this.extractData),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('get counterparty'))
    );
  }

  public editCounterparty(id: number, counterparty: Counterparty): Observable<Counterparty> {
    return this.http.put(API_URL + `counterparties/${id}`, counterparty).pipe(
      map(this.extractData),
      tap(() => this.snackBar.open('Counterparty was edited', 'Close')),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('update counterparty'))
    )
  }

  public deleteCounterparty(id: number): Observable<Counterparty> {
    return this.http.delete(API_URL + `counterparties/${id}`).pipe(
      map(this.extractData),
      tap(() => this.snackBar.open('Counterparty was deleted', 'Close')),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('delete counterparty'))
    )
  }

  public createCounterparty(counterparty: Counterparty): Observable<Counterparty> {
    return this.http.post(API_URL + 'counterparties', counterparty).pipe(
      map(this.extractData),
      tap(() => this.snackBar.open('Counterparty was created', 'Close')),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('update counterparty'))
    )
  }

  public getVASPs(): Observable<VASP[]> {
    return this.http.get(API_URL + 'vasp').pipe(
      map(this.extractData),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('get vasps'))
    )
  }

  public getCurrentVASP(): Observable<VASP> {
    return this.http.get(API_URL + 'vasp/current').pipe(
      map(this.extractData),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('get current vasp'))
    )
  }

  public getVAAN(vaspCode: string, customerNumber: string): Observable<string> {
    return this.http.get(API_URL + `vaan/${vaspCode}/${customerNumber}`, {responseType: 'text'}).pipe(
      map((res: string) => res),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('get vaan'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    // tslint:disable-next-line:no-any
    return (error: any): Observable<T> => {
      this.snackBar.open(`${operation} failed: ${error.message}`, 'Close');
      return of(result as T);  // Let the app keep running by returning an empty result.
    };
  }

  private extractData(res: Response) {
    return res || { };
  }
}
