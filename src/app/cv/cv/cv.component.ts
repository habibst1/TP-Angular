import { Component, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { catchError, Observable, of } from "rxjs";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);

  cvs: Observable<Cv[]>;
  juniors: Observable<Cv[]>;
  seniors: Observable<Cv[]>;
  selectedCv: Observable<Cv> | null = null;
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  selectedCategory: 'juniors' | 'seniors' = 'juniors';
  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    // Ajouter catchErrror dans la pipe 
    this.cvs =  this.cvService.getCvs().pipe(
      catchError( (e) => {
        console.log('we are in error');
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
          return of(this.cvService.getFakeCvs());
        })
    );
     this.juniors = this.cvService.getJuniors().pipe(
      catchError((e) => {
        console.log('Error fetching juniors');
        this.toastr.error("Impossible de récupérer les CVs des juniors.");
        return of([]);  // Return an empty array on error
      })
    );
  
    this.seniors = this.cvService.getSeniors().pipe(
      catchError((e) => {
        console.log('Error fetching seniors');
        this.toastr.error("Impossible de récupérer les CVs des seniors.");
        return of([]);  // Return an empty array on error
      })
    );

    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
    
    this.selectedCv =  this.cvService.selectCv$;
  }
  
  selectCategory(category: 'juniors' | 'seniors') {
    this.selectedCategory = category;
  }

  getCurrentCvs(): Observable<Cv[]> {
    return this.selectedCategory === 'juniors' ? this.juniors : this.seniors;
  }
}
  