import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {User} from '../../models/User';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {environment} from '../../../environments/environment';
import {FACEBOOK_PROVIDER, GOOGLE_PROVIDER, REDIRECT_URI} from '../../constants/OAuth2Constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterRequest} from '../../models/requests/RegisterRequest';
import {ErrorResponseDto} from '../../models/dtos/ErrorResponseDto';
import {PasswordMatch} from '../../validators/PasswordMatch';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginRequest} from '../../models/requests/LoginRequest';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private oauth2ProviderOpenedTimer;

  private GOOGLE_PROVIDER_URL = `${environment.oauth2_url}?provider=${GOOGLE_PROVIDER}&redirect_uri=${REDIRECT_URI}`;
  private FACEBOOK_PROVIDER_URL = `${environment.oauth2_url}?provider=${FACEBOOK_PROVIDER}&redirect_uri=${REDIRECT_URI}`;

  registerForm: FormGroup;
  loginForm: FormGroup;
  loginMode: boolean = true;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private formBuilder: FormBuilder) {
    this.initializeLoginForm();
    this.initializeRegisterForm();
  }

  ngOnInit() {

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

  get loginCtrls() {
    return this.loginForm.controls;
  }

  get registerCtrls() {
    return this.registerForm.controls;
  }

  switchForms() {
    this.loginMode = !this.loginMode;
  }

  initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  initializeRegisterForm() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: PasswordMatch('password', 'confirmPassword')
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginRequest: LoginRequest = this.loginForm.value;

    this.authService.authenticate(loginRequest).subscribe(data => {
      if (data.enabled) {
        this.tokenStorage.saveData(data);
        window.location.reload();
      }
    });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerRequest: RegisterRequest = this.registerForm.value;
    registerRequest.redirectUri = environment.redirect_uri;

    this.authService.register(registerRequest).subscribe(
      () => this.loginMode = true,
        error => this.handleFieldErrors(error));
  }

  private handleFieldErrors(error: HttpErrorResponse) {
    if (error.status === 400) {
      const errorResponse: ErrorResponseDto = error.error;
      errorResponse.fieldErrors.forEach(fieldError => {

        const formControl = this.registerForm.get(fieldError.field);
        if (formControl) {
          formControl.setErrors({
            serverError: fieldError.message
          });
        }

      });
    }
  }

}
