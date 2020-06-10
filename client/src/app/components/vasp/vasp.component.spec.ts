import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VASPComponent } from './vasp.component';
import { VASPService } from './vasp.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VASP } from '../../core/models/vasp.model';
import { of } from 'rxjs';

describe('CounterpartyDeatilsComponent', () => {
  let component: VASPComponent;
  let fixture: ComponentFixture<VASPComponent>;
  let vaspService: VASPService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      declarations: [VASPComponent],
      providers: [
        VASPService
      ]
    }).compileComponents();

    vaspService = TestBed.inject(VASPService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VASPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get vasps on init', () => {
    const vaspsResponse: VASP[] = [{id: "0x6befaf0656b953b188a0ee3bf3db03d07dface61", name: "VASP-1", vaspCode: "7dface61"}];
    const vaspServiceSpy = spyOn<any>(vaspService, 'getVASPs').and.returnValue(of(vaspsResponse));
    const vaspSpy = spyOn<any>(component, 'setVASPs');

    component.ngOnInit();

    expect(vaspServiceSpy).toHaveBeenCalled();
    expect(vaspSpy).toHaveBeenCalledWith(vaspsResponse);
  })

});
