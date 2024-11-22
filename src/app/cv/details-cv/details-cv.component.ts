import { Component, OnInit, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, EMPTY, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent implements OnInit {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  authService = inject(AuthService);

  cv$: Observable<Cv> | null = null;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {}

  ngOnInit() {
    this.cv$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        const id = params['id'];
        console.log(id);
        return this.cvService.getCvById(id).pipe(
          catchError((e) => {
            console.error(e);
            this.toastr.error(`CV with ID ${id} not found.`);
            this.router.navigate([APP_ROUTES.cv]);
            return EMPTY;
          })
        );
      })
    );
  }
  
  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).pipe(
      catchError( (e) => {
        this.toastr.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
        return EMPTY;
      }))
      .subscribe({
           next: () => {
           this.toastr.success(`${cv.name} supprimé avec succès`);
           this.router.navigate([APP_ROUTES.cv]);
      },
      });
    };
}

