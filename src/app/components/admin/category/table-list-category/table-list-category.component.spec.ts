import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListCategoryComponent } from './table-list-category.component';

describe('TableListCategoryComponent', () => {
  let component: TableListCategoryComponent;
  let fixture: ComponentFixture<TableListCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
