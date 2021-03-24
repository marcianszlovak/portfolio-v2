import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BfgVisualizerComponent } from './bfg-visualizer.component';

describe('BfgVisualizerComponent', () => {
  let component: BfgVisualizerComponent;
  let fixture: ComponentFixture<BfgVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BfgVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BfgVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
