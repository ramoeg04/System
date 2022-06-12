import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListDivisionComponent } from './table-list-division.component';

describe('TableListDivisionComponent', () => {
  let component: TableListDivisionComponent;
  let fixture: ComponentFixture<TableListDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListDivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
