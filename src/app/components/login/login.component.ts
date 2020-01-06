import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {User} from '../../models/User';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {environment} from '../../../environments/environment';
import {GOOGLE_PROVIDER, REDIRECT_URI} from '../../constants/OAuth2Constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private oauth2ProviderOpenedTimer;

  private user: User;
  private GOOGLE_PROVIDER_URL = `${environment.oauth2_url}?provider=${GOOGLE_PROVIDER}&redirect_uri=${REDIRECT_URI}`;

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

  navigateToProvider(provider: string) {
    const width = 500;
    const height = 600;

    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);

    const win = window.open(provider, 'Provider authentication',
      `width=${width}, height=${height}, left=${left}, top=${top}`);

    clearInterval(this.oauth2ProviderOpenedTimer);
    this.oauth2ProviderOpenedTimer = setInterval(() => {
      if (win.closed) {
        clearInterval(this.oauth2ProviderOpenedTimer);
        location.reload();
      }
    }, 1000);
  }

}
