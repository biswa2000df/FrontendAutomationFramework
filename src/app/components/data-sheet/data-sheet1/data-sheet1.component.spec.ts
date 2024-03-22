import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSheet1Component } from './data-sheet1.component';

describe('DataSheet1Component', () => {
  let component: DataSheet1Component;
  let fixture: ComponentFixture<DataSheet1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSheet1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSheet1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
