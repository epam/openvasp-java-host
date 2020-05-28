import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CreateTransferData, Transfer, TransferResponse } from '../../models/transfer.model';
import { Counterparty } from '../../models/counterparty.model';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  constructor(private http: HttpClient) {}

  public getTransfers(pageNumber: number, pageSize: number): Observable<TransferResponse> {
    return this.http.get(API_URL + 'transfers' + `?pageNr=${pageNumber}&pageSize=${pageSize}`).pipe(
      map(this.extractData),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('transfers'))
    );
  }

  public getTransfer(id: number): Observable<Transfer> {
    return this.http.get(API_URL + 'transfers/' + `${id}`).pipe(
      map(this.extractData),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('transfers'))
    );
  }

  public createTransfer(data: CreateTransferData): Observable<Transfer> {
    return this.http.post(API_URL + 'transfers', data).pipe(
      map(this.extractData),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('create transfer'))
    );
  }

  public getCounterparties(): Observable<Counterparty[]> {
    return this.http.get(API_URL + 'counterparties/all').pipe(
      map(this.extractData),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('counterparties/all'))
    );
  }

  public getCounterparty(id: number): Observable<Counterparty> {
    return this.http.get(API_URL + 'counterparties/' + id).pipe(
      map(this.extractData),
      // tslint:disable-next-line:no-any
      catchError(this.handleError<any>('get counterparty'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    // tslint:disable-next-line:no-any
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }
}
