import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteAdminComponent } from './vote-admin.component';

describe('VoteAdminComponent', () => {
  let component: VoteAdminComponent;
  let fixture: ComponentFixture<VoteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
