import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Stock } from '../model/stock';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // Inject HttpClient server
  private REST_API_SERVER = 'http://localhost:3000';

  // HttpOptions: get, post, put, delete
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  // Get method
  public getStocks(): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks`;
    // return this.httpClient.get<any>(url, this.httpOptions).pipe(
    //   map((stocks: any[]) => stocks.map(stock => {
    //     let stockObj = new Stock(
    //       stock.name,
    //       stock.code,
    //       stock.price,
    //       stock.previousPrice,
    //       stock.exchange
    //     );
    //     stockObj.favorite = stock.favorite;
    //     stockObj.id = stock.id;
    //     return stockObj;
    //   }))
    // );
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  // Post method
  public postStock(stock: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks`;
    console.log('postStock=', url);
    console.log('postStock: body', stock);
    return this.httpClient.post<any>(url, stock, this.httpOptions);
  }

  toggleFavorite(stock: any) {
    stock.favorite = !stock.favorite;
    const url = `${this.REST_API_SERVER}/stocks/${stock.id}`;
    // return this.httpClient.put<any>(url, stock, this.httpOptions).pipe(
    //   map((stock: any) => {
    //     let stockObj = new Stock(
    //       stock.name,
    //       stock.code,
    //       stock.price,
    //       stock.previousPrice,
    //       stock.exchange
    //     );
    //     stockObj.favorite = stock.favorite;
    //     stockObj.id = stock.id;
    //     return stockObj;
    //   })
    // );
    return this.httpClient.put<any>(url, stock, this.httpOptions);
  }

  addStock(newStock: Stock): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks`;
    // return this.httpClient.post<any>(url, newStock, this.httpOptions).pipe(
    //   map((stock: any) => {
    //     let stockObj = new Stock(
    //       stock.name,
    //       stock.code,
    //       stock.price,
    //       stock.previousPrice,
    //       stock.exchange
    //     );
    //     stockObj.favorite = stock.favorite;
    //     stockObj.id = stock.id;
    //     return stockObj;
    //   })
    // );
    return this.httpClient.post<any>(url, newStock, this.httpOptions);
  }



  updateStock(stock: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks/${stock.id}`;
    // return this.httpClient.put<any>(url, stock, this.httpOptions).pipe(
    //   map((stock: any) => {
    //     let stockObj = new Stock(
    //       stock.name,
    //       stock.code,
    //       stock.price,
    //       stock.previousPrice,
    //       stock.exchange
    //     );
    //     stockObj.favorite = stock.favorite;
    //     stockObj.id = stock.id;
    //     return stockObj;
    //   })
    // );
    return this.httpClient.put<any>(url, stock, this.httpOptions);
  }

  deleteStock(stockId: number): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks/${stockId}`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }
  getStockByCode(id: string): Observable<Stock[]> {
    const url = `${this.REST_API_SERVER}/stocks/${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
}
