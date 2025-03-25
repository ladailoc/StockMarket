import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  toggleFavorite(stock: any) {
    stock.favorite = !stock.favorite;
    const url = `${this.REST_API_SERVER}/stocks/${stock.id}`;
    return this.httpClient.put<any>(url, stock, this.httpOptions);
  }

  addStock(newStock: Stock): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks`;
    return this.httpClient.post<any>(url, newStock, this.httpOptions);
  }

  updateStock(stock: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks/${stock.id}`;
    return this.httpClient.put<any>(url, stock, this.httpOptions);
  }

  deleteStock(stockId: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/stocks/${stockId}`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }
  getStockByCode(id: string): Observable<Stock[]> {
    const url = `${this.REST_API_SERVER}/stocks/${id}`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
}
