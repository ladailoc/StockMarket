import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../model/stock';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-stock-list',
  standalone: false,
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss',
})
export class StockListComponent implements OnInit {
  stocks!: Stock[];
  isLogin = false;
  isModalOpen = false;
  modalMode: 'view' | 'edit' | 'add' | '' = '';
  selectedStock!: Stock;
  editStockForm!: FormGroup;
  addStockForm!: FormGroup;
  stockSearch!: any;
  codeSearch!: string;
  stockArray: Stock[] = [];
  isSearch = false;
  isFav = false;
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadStocks();
  }

  loadStocks() {
    this.httpService.getStocks().subscribe((res) => {
      this.stocks = res.map((stock: Stock) => {
        let stockObj = new Stock(
          stock.name,
          stock.code,
          stock.price,
          stock.previousPrice,
          stock.exchange
        );
        stockObj.favorite = stock.favorite;
        stockObj.id = stock.id;
        return stockObj;
      });
      this.stockArray = this.stocks;
      console.log('stocks:', this.stocks);
      console.log('stocks:', typeof this.stockArray);
    });
    this.isLogin = this.auth.getUsername() ? true : false;
    this.isFav = false;
  }

  openModal(stock: Stock | null, mode: 'view' | 'edit' | 'add') {
    this.modalMode = mode;
    this.isModalOpen = true;

    if ((mode === 'edit' || mode === 'view') && stock) {
      this.selectedStock = stock;
      this.editStockForm = this.fb.group({
        code: [stock.code],
        name: [stock.name],
        price: [stock.price],
        previousPrice: [stock.previousPrice],
        favorite: [stock.favorite],
      });
    } else if (mode === 'add') {
      this.selectedStock = {} as Stock; // Tạo một đối tượng Stock rỗng
      this.addStockForm = this.fb.group({
        code: [''],
        name: [''],
        price: [0],
        previousPrice: [0],
        favorite: [false],
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

      this.httpService.updateStock(this.selectedStock).subscribe({
        next: () => {
          this.loadStocks();
          this.closeModal();
        },
        error: (err) => console.error('Lỗi cập nhật:', err),
      });
    }
  }

  createStock(stock: Stock) {
    this.httpService.addStock(stock).subscribe({
      next: () => {
        this.loadStocks();
        this.closeModal();
      },
      error: (err) => console.error('Lỗi thêm cổ phiếu:', err),
    });
  }

  deleteStock(stock: Stock) {
    if (confirm('Bạn có chắc muốn xóa cổ phiếu này không?')) {
      this.httpService.deleteStock(stock.id).subscribe(() => this.loadStocks());
    }
  }

  viewDetail(stock: Stock) {
    this.router.navigate(['/stock/stock-details'], {
      state: { stockData: stock },
    });
  }

  toggleFavorite(stock: Stock) {
    stock.favorite = !stock.favorite;
    this.httpService.toggleFavorite(stock).subscribe();
  }

  searchStockByCode() {
    this.codeSearch = this.codeSearch.trim();
    console.log('codeSearch:', this.codeSearch);
    if (this.codeSearch === '') {
      this.stockArray = this.stocks;
    } else
      this.stockArray = this.stocks.filter((stock) =>
        stock.code.toLowerCase().includes(this.codeSearch.toLowerCase())
      );
  }

  filterFav() {
    this.isFav = true;
    this.stockArray = this.stockArray.filter((stock) => stock.favorite);
  }
}
