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
  // constructor(){
  //   this.stock = new Stock('', '', 0, 0);
  // }

  ngOnInit(): void {
    this.stock = new Stock("", "", 0, 0);
  }

  isStockNameValid = false;
  checkName(): boolean {
    return this.isStockNameValid = this.stock.name.trim().length >= 6;
  }
  isStockCodeValid = true;
  firstCode = "";
  checkCode(): boolean {
    return this.isStockCodeValid = this.firstCode == this.stock.code;
  }
  isStockPriceValid = true;
  checkPrice(): void {
    this.isStockPriceValid = false;
  }

  getStockInfo(): string {
    return `Stock Name is {"name" : "${this.stock.name}", "code" : "${this.stock.code}", "price" : ${this.stock.price}, "previousPrice" : ${this.stock.previousPrice}}`;
  }
  isShowStockInfo = false;
  showStockInfo(): void {
    this.isShowStockInfo = true;
  }
}
