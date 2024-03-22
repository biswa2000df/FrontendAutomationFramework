import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSheet3Component } from './main-sheet3.component';

describe('MainSheet3Component', () => {
  let component: MainSheet3Component;
  let fixture: ComponentFixture<MainSheet3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSheet3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainSheet3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
