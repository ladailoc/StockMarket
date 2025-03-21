import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { HomeComponent } from './home/home.component';
import { StockService } from './services/stock.service';
import { ListViewStockComponent } from './stock/list-view-stock/list-view-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockItemComponent,
    CreateStockComponent,
    StockListComponent,
    HomeComponent,
    ListViewStockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
