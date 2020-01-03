import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Oauth2Service} from "../../auth/services/oauth2.service";
import {TokenStorageService} from "../../auth/services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.scss']
})
export class Oauth2Component implements OnInit {

  constructor(private authService: AuthService, private oauth2Service: Oauth2Service,
              private tokenStorage: TokenStorageService, private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(
      params => {
        console.log(params['testParam']);
        this.router.navigate(['/login']);
      });
  }

  ngOnInit() {
  }

}
