import { Component, Input, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  standalone: false,
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.scss'
})
export class StockItemComponent {
  @Input() stock!: Stock;

  constructor(private _stockService: StockService) {}

  toggleFavorite(stock: Stock){
    this._stockService.toggleFavorite(stock);
  }
}
