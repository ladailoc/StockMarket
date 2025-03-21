import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocks: any[] = [
    new Stock('Apple', 'AAPL', 150, 200, 'NASDAQ'),
    new Stock('Google', 'GOOGL', 2500, 2200, 'NASDAQ'),
    new Stock('Microsoft', 'MSFT', 320, 300, 'NASDAQ'),
    new Stock('Amazon', 'AMZN', 3300, 3500, 'NASDAQ'),
    new Stock('Facebook', 'FB', 250, 300, 'NASDAQ'),
    new Stock('Tesla', 'TSLA', 890, 800, 'NASDAQ'),
    new Stock('Netflix', 'NFLX', 500, 600, 'NASDAQ'),
    new Stock('Nvidia', 'NVDA', 600, 700, 'NASDAQ'),
    new Stock('Paypal', 'PYPL', 250, 300, 'NASDAQ'),
    new Stock('Shopify', 'SHOP', 1500, 1600, 'NASDAQ')
  ];

  constructor() { }

  toggleFavorite(stock: Stock) {
    if (stock) {
      stock.favorite = !stock.favorite;
    }
  }

  getStocks() {
    return this.stocks;
  }

  addStock(newStock: Stock) {
    this.stocks.push(newStock);
  }

  getStockByCode(code: string) {
    return this.stocks.filter(stock => stock.code.toLowerCase() === code);
  }

  getStockByName(name: string) {
    return this.stocks.filter(stock => stock.name.toLowerCase() === name);
  }

  updateStock(stockCode: string, updatedStock: Stock) {
    const index = this.stocks.findIndex(stock => stock.code === stockCode);
    if (index !== -1) {
      this.stocks[index] = updatedStock;
    }
  }

  deleteStock(stockCode: string) {
    this.stocks = this.stocks.filter(stock => stock.code !== stockCode);
  }
}
