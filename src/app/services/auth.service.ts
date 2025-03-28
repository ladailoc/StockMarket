import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usernameKey = ''; // Khóa lưu username trong localStorage

  constructor() {}

  // Lưu username vào localStorage khi đăng nhập
  login(username: string) {
    localStorage.setItem(this.usernameKey, username);
  }

  // Lấy username đã đăng nhập
  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  // Xóa username khi đăng xuất
  logout() {
    localStorage.removeItem(this.usernameKey);
  }
}
