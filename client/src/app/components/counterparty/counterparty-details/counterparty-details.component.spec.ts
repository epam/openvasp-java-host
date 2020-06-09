import { CounterpartyDetailsComponent } from './counterparty-details.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterpartyService } from '../counterparty.service';
import { DialogService } from '../../dialog/dialog.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { Counterparty } from '../../../core/models/counterparty.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('CounterpartyDeatilsComponent', () => {
  let component: CounterpartyDetailsComponent;
  let fixture: ComponentFixture<CounterpartyDetailsComponent>;
  let counterpartyService;
  let dialogServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule
      ],
      declarations: [CounterpartyDetailsComponent],
      providers: [
        CounterpartyService,
        DialogService
      ]
    }).compileComponents();

    counterpartyService = TestBed.inject(CounterpartyService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterpartyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });

  xit('should get counterparties on init', () => {
    const counterpartyMock: Counterparty = {
      vaspCode: '',
      bic: '',
      birth: {birthCountry: '', birthDate: '', birthTown: ''},
      jurIds: [],
      natIds: [],
      role: '',
      postalAddress: undefined,
      id: 1, name: 'Test', type: 'INCOMING', vaan: 'Test'
    };
    let counterpartyServiceSpy = spyOn<any>(counterpartyService, 'getCounterparties').and.returnValue([counterpartyMock]);

    expect(counterpartyServiceSpy).toHaveBeenCalledWith(counterpartyMock.id);

  })
});
