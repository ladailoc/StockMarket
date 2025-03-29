import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stock-details',
  standalone: false,
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.scss',
})
export class StockDetailsComponent {
  stock: any;
  constructor(private location: Location) {}

  ngOnInit(): void {
    const navigation = this.location.getState() as any;
    console.log('navigation:', navigation);

    this.stock = navigation.stockData;
  }
}
