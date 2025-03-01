import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { CreateStockComponent } from '../create-stock/create-stock.component';

@Component({
  selector: 'app-stock-item',
  standalone: false,
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.scss'
})
export class StockItemComponent implements OnInit {
  public stockList: Array<Stock> = [];

  constructor() {
    // this.stock = new Stock('', '', 0, 0);
  }

  ngOnInit(): void {
    this.stockList.push(new Stock('Test Stock Company', 'TSC', 85, 80));
  }

  toggleFavorite(event: Event, i : number) {
    console.log('We are toggling the favorite state for this stock', event);
    this.stockList[i].favorite = !this.stockList[i].favorite;
  }
}
