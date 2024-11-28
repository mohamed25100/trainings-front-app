import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthenticateService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.authService.login({ username: this.username, password: this.password })) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigate([returnUrl]);
    } else {
      alert('Nom d\'utilisateur ou mot de passe invalide');
    }
  }
}
