import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // Inject HttpClient server

  // HttpOptions: get, post, put, delete
  constructor(private httpClient: HttpClient) { }
  
  // Get method

  // Post method
}
