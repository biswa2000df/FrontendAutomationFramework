import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSheet2Component } from './data-sheet2.component';

describe('DataSheet2Component', () => {
  let component: DataSheet2Component;
  let fixture: ComponentFixture<DataSheet2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataSheet2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataSheet2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
