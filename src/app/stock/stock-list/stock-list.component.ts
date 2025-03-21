import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-list',
  standalone: false,
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss'
})
export class StockListComponent implements OnInit {
  stocks: any[] = [];

  constructor(private _stockService: StockService) { }

  ngOnInit() {
    this.loadStocks();
    console.log("Stocks:", this.stocks);
  }

  loadStocks() {
    this.stocks = this._stockService.getStocks();
  }

  searchStockByCode(code: string) {
    if (code.length === 0) {
      this.loadStocks();
    }
    else {
      this.stocks = this._stockService.getStockByCode(code.toLowerCase());
      // console.log("Stocks:", this.stocks);
    }
  }

  searchStockByName(name: string) {
    if (name.length === 0) {
      this.loadStocks();
    }
    else 
      this.stocks = this._stockService.getStockByName(name.toLowerCase());
    
  }

  toggleFavorite(stock: Stock) {
    this._stockService.toggleFavorite(stock);
  }

  updatedStock(stock: Stock) {
    this._stockService.updateStock(stock.code, stock);
  }

  deleteStock(stock: Stock) {
    const confirmDelete = confirm("Bạn có chắc muốn xóa cổ phiếu này không?");
    if (confirmDelete) {
      this._stockService.deleteStock(stock.code);
      this.loadStocks();
    }
  }

}
