import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {User} from '../../models/User';
import {TokenStorageService} from '../../auth/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) {
    this.user = new User();
  }

  ngOnInit() {

  }

  login() {
    this.authService.authenticate(this.user).subscribe(data => {
      this.tokenStorage.saveData(data);
      window.location.reload();
    });
  }
}
