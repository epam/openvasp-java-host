import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { CounterpartyComponent } from './counterparty.component';
import { CounterpartyService } from './counterparty.service';

describe('CounterpartyComponent', () => {
  let component: CounterpartyComponent;
  let fixture: ComponentFixture<CounterpartyComponent>;
  let counterpartyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      declarations: [CounterpartyComponent],
      providers: [
        CounterpartyService
      ]
    }).compileComponents();

    counterpartyService = TestBed.inject(CounterpartyService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterpartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get counterparties after view init', () => {
    const spy = spyOn<any>(component, 'getCounterparties').and.returnValue(of());

    component.ngAfterViewInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should get counterparties on completed action', () => {
    const spy = spyOn<any>(component, 'getCounterparties').and.returnValue(of());

    component.onCompletedAction();

    expect(spy).toHaveBeenCalled();
  });
});
