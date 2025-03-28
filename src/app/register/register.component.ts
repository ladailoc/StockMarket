import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';
  users: User[] = [];

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data.map((user: any) => {
        let userObj = new User(user.username, user.password, user.email);
        userObj.id = user.id;
        return userObj;
      });
    });
  }

  register() {
    if (this.username && this.password && this.email) {
      // Check if username already exists
      const existingUser = this.users.find(
        (user) => user.username === this.username
      );
      if (existingUser) {
        this.errorMessage = 'Username already exists!';
        return;
      }
      const newUser = new User(this.username, this.password, this.email);
      this.userService.addUser(newUser).subscribe((res) => {
        console.log('User registered successfully:', res);
      });
      this.route.navigate(['/login']);
    } else {
      this.errorMessage = 'Please fill in all fields.';
    }
  }
}
