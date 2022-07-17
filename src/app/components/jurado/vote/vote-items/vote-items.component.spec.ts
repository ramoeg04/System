import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteItemsComponent } from './vote-items.component';

describe('VoteItemsComponent', () => {
  let component: VoteItemsComponent;
  let fixture: ComponentFixture<VoteItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
