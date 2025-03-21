import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../model/stock';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-list',
  standalone: false,
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent implements OnInit {
  public stocks$!: Observable<Stock[]>;

  constructor(private _stockService: StockService) { }

  ngOnInit() {
    this.loadStocks();
    console.log("Stocks:", this.stocks$);
  }

  loadStocks() {
    this.stocks$ = this._stockService.getStocks();
  }

  searchStockByCode(code: string) {
    code = code.trim().toLowerCase();
    this.stocks$ = code.length === 0
      ? this._stockService.getStocks()
      : this._stockService.getStockByCode(code);
  }

  searchStockByName(name: string) {
    name = name.trim().toLowerCase();
    this.stocks$ = name.length === 0
      ? this._stockService.getStocks()
      : this._stockService.getStockByName(name);
  }

  toggleFavorite(stock: Stock) {
    this._stockService.toggleFavorite(stock);
  }

  updatedStock(stock: Stock) {
    this._stockService.updateStock(stock.code, stock).subscribe({
      next: () => this.loadStocks(),
      error: err => console.error('Error updating stock:', err)
    });
  }

  deleteStock(stock: Stock) {
    const confirmDelete = confirm("Bạn có chắc muốn xóa cổ phiếu này không?");
    if (confirmDelete) {
      this._stockService.deleteStock(stock.code).subscribe({
        next: () => this.loadStocks(),
        error: err => console.error('Error deleting stock:', err)
      });
    }
  }

}
