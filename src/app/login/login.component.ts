import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private router: Router) {}

  login(){
    if (this.username === 'admin' && this.password === '123'){
      this.errorMessage = '';
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng!';
    }
  }
  ngOnInit(): void {
    
  }
}
