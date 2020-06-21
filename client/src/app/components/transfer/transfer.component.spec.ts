import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { TransferComponent } from './transfer.component';
import { TransferService } from './transfer.service';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;
  let counterpartyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      declarations: [TransferComponent],
      providers: [
        TransferService
      ]
    }).compileComponents();

    counterpartyService = TestBed.inject(TransferService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get transfers after view init', () => {
    const spy = spyOn<any>(component, 'getTransfers').and.returnValue(of());

    component.ngAfterViewInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should get transfers on completed action', () => {
    const spy = spyOn<any>(component, 'getTransfers').and.returnValue(of());

    component.onCompletedAction();

    expect(spy).toHaveBeenCalled();
  });
});
