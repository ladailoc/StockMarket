import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../model/stock';
import { StockListComponent } from '../stock-list/stock-list.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock-item',
  standalone: false,
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.scss',
})
export class StockItemComponent {
  @Input() stock!: Stock;
  editing = false;
  editStockForm!: FormGroup;

  constructor(private _stockList: StockListComponent, private fb: FormBuilder) { }

  createForm() {
    this.editStockForm = this.fb.group({
      name: [this.stock.name],
      price: [this.stock.price],
      previousPrice: [this.stock.previousPrice],
      favorite: [this.stock.favorite]
    });
  }

  toggleFavorite(stock: Stock) {
    this._stockList.toggleFavorite(stock);
  }

  editStock(stock: Stock) {
    this.editing = !this.editing;
    if (this.editing) {
      this.createForm();
    }
  }
  saveStock() {
    if (this.editStockForm.valid) {
      this.stock.name = this.editStockForm.value.name;
      this.stock.price = this.editStockForm.value.price;
      this.stock.previousPrice = this.editStockForm.value.previousPrice;
      this.stock.favorite = this.editStockForm.value.favorite;

      this._stockList.updatedStock(this.stock);
      this.editing = false;
    }
  }


  deleteStock(stock: Stock) {
    this._stockList.deleteStock(stock);
  }
}
