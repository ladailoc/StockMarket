import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-create-stock',
  standalone: false,
  templateUrl: './create-stock.component.html',
  styleUrl: './create-stock.component.scss'
})
export class CreateStockComponent {
  public stock!: Stock;

  ngOnInit(): void {
    this.stock = new Stock("", "", 0, 0, "");
  }

  get isStockNameValid(): boolean {
    return this.stock.name.trim().length >= 6;
  }

  firstCode = "";
  get isStockCodeValid(): boolean {
    return this.firstCode == this.stock.code;
  }

  isStockPriceValid = true;
  checkPrice(): void {
    this.isStockPriceValid = false;
  }

  isShowStockInfo = false;
  get isDataValid(): boolean {
    return this.isStockNameValid;
  }
  showStockInfo(): void {
    this.isShowStockInfo = true;
  }
}
