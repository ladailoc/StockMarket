import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-create-stock',
  standalone: false,
  templateUrl: './create-stock.component.html',
  styleUrl: './create-stock.component.scss'
})
export class CreateStockComponent {
  public stockForm!: FormGroup;
  constructor(private fb: FormBuilder, private _stockService: StockService) {
    this.createForm();
  }

  createForm(): void {
    this.stockForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(6)]],
      code: ["", [Validators.required, Validators.minLength(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      // previousPrice: [0, [Validators.required]],
      exchange: ["", Validators.required],
      confirmed: [false, Validators.requiredTrue]
    });
  }

  loadStockServer(): void {
    // Giả lập dữ liệu từ server
    const stockData = {
      name: 'Apple Inc.',
      code: 'AAPL',
      price: 150,
    };

    // Điền dữ liệu vào form
    this.patchStockForm(stockData);
    console.log("StockForm Value:", this.stockForm.value);
    console.log("isShowStockInfo:", this.isShowStockInfo);

  }
  patchStockForm(stockData: any) {
    this.stockForm.patchValue({
      name: stockData.name,
      code: stockData.code,
      price: stockData.price
    });
    console.log("Sau khi patch form - isShowStockInfo:", this.isShowStockInfo);

  }

  createStock() {
    if (this.stockForm.valid) {
      const stockData = this.stockForm.value;
      const newStock = new Stock(stockData.name, stockData.code, stockData.price, 0, stockData.exchange);
      this._stockService.addStock(newStock).subscribe({
        next: () => console.log('Stock added successfully'),
        error: (err) => console.error('Error adding stock:', err)
      });
    } else {
      console.log('Form is invalid');
    }
  }

  isShowStockInfo = false;
  showStockInfo(): void {
    this.isShowStockInfo = true;
    console.log("Đã gọi showStockInfo - isShowStockInfo:", this.isShowStockInfo);
  }
}
