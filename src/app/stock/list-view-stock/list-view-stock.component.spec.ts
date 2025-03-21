import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewStockComponent } from './list-view-stock.component';

describe('ListViewStockComponent', () => {
  let component: ListViewStockComponent;
  let fixture: ComponentFixture<ListViewStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListViewStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListViewStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
