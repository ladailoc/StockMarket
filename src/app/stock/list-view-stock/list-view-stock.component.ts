import { Component } from '@angular/core';
import { Stock } from '../../model/stock';
import { StockService } from '../../services/stock.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-view-stock',
  standalone: false,
  templateUrl: './list-view-stock.component.html',
  styleUrl: './list-view-stock.component.scss'
})
export class ListViewStockComponent {
  public stocks$!: Observable<Stock[]>;

  isModalOpen = false;
  modalMode: 'view' | 'edit' | '' = '';
  selectedStock!: Stock;
  editStockForm!: FormGroup;

  constructor(private _stockService: StockService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadStocks();
  }

  loadStocks() {
    this.stocks$ = this._stockService.getStocks();
  }

  openModal(stock: Stock, mode: 'view' | 'edit') {
    this.selectedStock = stock;
    this.modalMode = mode;
    this.isModalOpen = true;

    if (mode === 'edit') {
      this.editStockForm = this.fb.group({
        name: [stock.name],
        price: [stock.price],
        previousPrice: [stock.previousPrice],
        favorite: [stock.favorite]
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalMode = '';
  }

  saveStock() {
    if (this.editStockForm.valid) {
      this.selectedStock.name = this.editStockForm.value.name;
      this.selectedStock.price = this.editStockForm.value.price;
      this.selectedStock.previousPrice = this.editStockForm.value.previousPrice;
      this.selectedStock.favorite = this.editStockForm.value.favorite;


      this._stockService.updateStock(this.selectedStock.code, this.selectedStock).subscribe({
        next: () => {
          this.loadStocks();
          this.closeModal();
        },
        error: err => console.error('Lỗi cập nhật:', err)
      });
    }
  }

  deleteStock(stock: Stock) {
    if (confirm("Bạn có chắc muốn xóa cổ phiếu này không?")) {
      this._stockService.deleteStock(stock.code).subscribe(() => this.loadStocks());
    }
  }

  toggleFavorite(stock: Stock) {
    this._stockService.toggleFavorite(stock);
  }

  searchStockByCode(code: string) {
    code = code.trim().toLowerCase();
    this.stocks$ = code.length === 0
      ? this._stockService.getStocks()
      : this._stockService.getStockByCode(code);
  }
}
