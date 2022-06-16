import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListInscriptionComponent } from './table-list-inscription.component';

describe('TableListInscriptionComponent', () => {
  let component: TableListInscriptionComponent;
  let fixture: ComponentFixture<TableListInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
