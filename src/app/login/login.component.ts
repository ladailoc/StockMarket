import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  users: any[] = [];
  constructor(private router: Router, private userService: UserService, private auth: AuthService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data.map((user: any) => {
        let userObj = new User(user.username, user.password, user.email);
        userObj.id = user.id;
        return userObj;
      });
    });
  }

  login() {
    if (
      this.users.find(
        (user) =>
          user.username === this.username && user.password === this.password
      )
    ) {
      this.errorMessage = '';
      this.auth.login(this.username);
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid username or password!';
    }
  }
}
