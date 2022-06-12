import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListUserComponent } from './table-list-user.component';

describe('TableListUserComponent', () => {
  let component: TableListUserComponent;
  let fixture: ComponentFixture<TableListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
