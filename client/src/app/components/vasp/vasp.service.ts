import { Injectable } from '@angular/core';
import { DataProviderService } from '../../core/services/data-provider/data-provider.service';
import { Observable } from 'rxjs';
import { VASP } from '../../core/models/vasp.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class VASPService {
  constructor(private dataProvider: DataProviderService) {}

  public getVASPs(): Observable<VASP[]> {
    return this.dataProvider.getVASPs().pipe(
      tap(data => data)
    )
  }

  public getVAAN(vaspCode: string, customerNumber: string): Observable<string> {
    return this.dataProvider.getVAAN(vaspCode, customerNumber).pipe(
      tap(data => data)
    )
  }
}
