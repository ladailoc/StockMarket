import { Component, Input, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  standalone: false,
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.scss'
})
export class StockItemComponent implements OnInit {
  stocks: Stock[] = [];

  constructor(private _stockService: StockService) {}

  ngOnInit() {
    this.stocks = this._stockService.getStocks();
  }
  
  toggleFavorite(code: string) {
    this._stockService.toggleFavorite(code);
  }
}
