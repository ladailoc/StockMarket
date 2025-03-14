import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';

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

  getStocks(): any[] {
    return this.stocks;
  }

  toggleFavorite(code: string) {
    const stock = this.stocks.find(stock => stock.code === code);
    if (stock) {
      stock.favorite = !stock.favorite;
    }
  }


  getStock(code: string) {
    return this.stocks.find(stock => stock.code === code);
  }

  addStock(stock: Stock) {
    this.stocks.push(stock);
  }

  updateStock(code: string, stock: Stock) {
    const index = this.stocks.findIndex(stock => stock.code === code);
    if (index !== -1) {
      this.stocks[index] = stock;
    }
  }

  deleteStock(code: string) {
    this.stocks = this.stocks.filter(stock => stock.code !== code);
  }
}
