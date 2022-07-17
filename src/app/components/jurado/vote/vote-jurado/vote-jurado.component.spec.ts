import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteJuradoComponent } from './vote-jurado.component';

describe('VoteJuradoComponent', () => {
  let component: VoteJuradoComponent;
  let fixture: ComponentFixture<VoteJuradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteJuradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteJuradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
