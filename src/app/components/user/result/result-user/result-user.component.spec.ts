import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultUserComponent } from './result-user.component';

describe('ResultUserComponent', () => {
  let component: ResultUserComponent;
  let fixture: ComponentFixture<ResultUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
