import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CredentialsDto } from '../dto/credentials.dto';
import { ROUTES, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}
  login(credentials: CredentialsDto) {
    this.authService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.id);
        this.toastr.success(`Bienvenu chez vous :)`);
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: (error) => {
        this.toastr.error('Veuillez vérifier vos credentials');
      },
    });
  }
}
