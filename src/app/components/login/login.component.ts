import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {User} from '../../models/User';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {Oauth2Service} from '../../auth/services/oauth2.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User;

  constructor(private authService: AuthService, private oauth2Service: Oauth2Service,
              private tokenStorage: TokenStorageService) {
    this.user = new User();
  }

  ngOnInit() {

  }

  login() {
    this.authService.authenticate(this.user).subscribe(data => {
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveEmail(data.email);
      this.tokenStorage.saveId(data.id);
      this.tokenStorage.saveAuthorities(data.authorities);
      window.location.reload();
    });
  }

  oauth2Login(provider: string) {
    this.oauth2Service.authenticate(provider).subscribe(data => {
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveEmail(data.email);
      this.tokenStorage.saveId(data.id);
      this.tokenStorage.saveAuthorities(data.authorities);
      window.location.reload();
    });
  }

}
