import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesComponent } from './tiles.component';
import { TestModule } from '../test.module';

describe('TilesComponent', () => {
  let component: TilesComponent;
  let fixture: ComponentFixture<TilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 100 tiles at startup', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const tileBoard = compiled.querySelector('.tile-board');
    expect(tileBoard.children.length).toEqual(100);
  });

  it('should not render a robot at startup', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const tileBoard = compiled.querySelector('.robot');
    expect(tileBoard).toBeFalsy();
  });
});
