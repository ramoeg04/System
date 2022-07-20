import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteSelectComponent } from './vote-select.component';

describe('VoteSelectComponent', () => {
  let component: VoteSelectComponent;
  let fixture: ComponentFixture<VoteSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
