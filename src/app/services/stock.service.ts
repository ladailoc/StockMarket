import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';
import { Observable } from 'rxjs';
import { of as createObservable } from 'rxjs';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocks: Stock[] = [
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

  getStocks(): Observable<Stock[]> {
    return createObservable(this.stocks);
  }

  addStock(newStock: Stock): Observable<any> {
    let foundStock = this.stocks.find(stock => stock.code === newStock.code);
    if (foundStock) {
      return throwError(() => new Error('Stock with code ' + newStock.code + ' already exists'));
    }
    this.stocks.push(newStock);
    return createObservable({msg: 'Stock with code ' + newStock.code + ' added successfully'});
  }

  getStockByCode(code: string): Observable<Stock[]> {
    return createObservable(this.stocks.filter(stock => stock.code.toLowerCase() === code));
  }

  getStockByName(name: string): Observable<Stock[]> {
    return createObservable(this.stocks.filter(stock => stock.name.toLowerCase() === name));
  }

  updateStock(stockCode: string, updatedStock: Stock): Observable<any> {
    let index = this.stocks.findIndex(stock => stock.code === stockCode);
    if (index !== -1) {
      this.stocks[index] = updatedStock;
      return createObservable({msg: 'Stock with code ' + stockCode + ' updated successfully'});
    }
    return throwError(() => new Error('Stock with code ' + stockCode + ' not found'));
  }

  deleteStock(stockCode: string): Observable<any> {
    const lengthBeforeDelete = this.stocks.length;
    this.stocks = this.stocks.filter(stock => stock.code !== stockCode);
    return this.stocks.length < lengthBeforeDelete 
      ? createObservable({msg: 'Stock with code ' + stockCode + ' deleted successfully'}) 
      : throwError(() => new Error('Stock with code ' + stockCode + ' not found')); 
  }
}
