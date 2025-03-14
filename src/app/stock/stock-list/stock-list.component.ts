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
    this.stocks = this._stockService.getStocks();
  }
}
