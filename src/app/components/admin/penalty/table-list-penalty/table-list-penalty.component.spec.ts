import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListPenaltyComponent } from './table-list-penalty.component';

describe('TableListPenaltyComponent', () => {
  let component: TableListPenaltyComponent;
  let fixture: ComponentFixture<TableListPenaltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListPenaltyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListPenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
