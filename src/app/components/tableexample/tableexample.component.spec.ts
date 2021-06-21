import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableexampleComponent } from './tableexample.component';

describe('TableexampleComponent', () => {
  let component: TableexampleComponent;
  let fixture: ComponentFixture<TableexampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableexampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
