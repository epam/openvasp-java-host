import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogService } from '../dialog.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('DialogService', () => {
  let service: DialogService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        DialogService,
        MatDialog
      ]
    });

    dialog = TestBed.inject(MatDialog);
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});
