import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniMailComponent } from './mini-mail.component';

describe('MiniMailComponent', () => {
  let component: MiniMailComponent;
  let fixture: ComponentFixture<MiniMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
