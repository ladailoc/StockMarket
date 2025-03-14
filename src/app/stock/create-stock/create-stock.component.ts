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
export class CreateStockComponent implements OnInit {
  public stockForm!: FormGroup;
  constructor(private fb : FormBuilder, private _stockService: StockService) {
      this.createForm();
  }
  
  createForm(): void {
    this.stockForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(6)]],
      code: ["", [Validators.required, Validators.minLength(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      // previousPrice: [0, [Validators.required]],
      exchange: ["", Validators.required]
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
  }
  patchStockForm(stockData: any){
    this.stockForm.patchValue({
      name: stockData.name,
      code: stockData.code,
      price: stockData.price,
    });
  }

  createStock(): any {
    if (this.stockForm.valid) {
      const newStock = this.stockForm.value;
      this._stockService.addStock(new Stock(newStock.name, newStock.code, newStock.price, 0, newStock.exchange));
      console.log('Form is valid');
    } else {
      console.log('Form is invalid');
    }
  }

  public stock!: Stock;
  
  ngOnInit(): void {
    this.stock = new Stock("", "", 0, 0, "");
  }

  isShowStockInfo = false;
  showStockInfo(): void {
    this.isShowStockInfo = true;
  }
}
