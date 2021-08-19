import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerstatusComponent } from './serverstatus.component';

describe('ServerstatusComponent', () => {
  let component: ServerstatusComponent;
  let fixture: ComponentFixture<ServerstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
