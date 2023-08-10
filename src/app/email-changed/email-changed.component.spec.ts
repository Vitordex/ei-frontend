import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailChangedComponent } from './email-changed.component';

describe('EmailChangedComponent', () => {
  let component: EmailChangedComponent;
  let fixture: ComponentFixture<EmailChangedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailChangedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailChangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
