import { TestBed } from '@angular/core/testing';
import { VASPService } from './vasp.service';
import { DataProviderService } from '../../core/services/data-provider/data-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('VASPService', () => {
  let service: VASPService;
  let dataProvider: DataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        VASPService,
        DataProviderService
      ]
    })

    service = TestBed.inject(VASPService);
    dataProvider = TestBed.inject(DataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should get vasps', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'getVASPs').and.returnValue(of());

    service.getVASPs();

    expect(dataProviderSpy).toHaveBeenCalled();
  });

  it('should get current vasp', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'getCurrentVASP').and.returnValue(of());

    service.getCurrentVASP();

    expect(dataProviderSpy).toHaveBeenCalled();
  });

  it('should get vasps', () => {
    const dataProviderSpy = spyOn<any>(dataProvider, 'getVAAN').and.returnValue(of());
    const vaspCode = 'test';
    const customerNumber = 'test';

    service.getVAAN(vaspCode, customerNumber);

    expect(dataProviderSpy).toHaveBeenCalledWith(vaspCode, customerNumber);
  });

});
