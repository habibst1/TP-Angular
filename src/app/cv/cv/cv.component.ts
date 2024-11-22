import { Component, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { catchError, map, Observable, of } from "rxjs";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);
  private route = inject(ActivatedRoute)

  cvs$: Observable<Cv[]>;
  juniors$: Observable<Cv[]>;
  seniors$: Observable<Cv[]>;
  selectedCv: Observable<Cv> | null = null;
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  selectedCategory: 'juniors' | 'seniors' = 'juniors';
  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const resolvedCvs = this.route.snapshot.data['cvs'] as Cv[];

    this.cvs$ = of(resolvedCvs);

    this.juniors$ = this.cvs$.pipe(
      map(cvs => cvs.filter(cv => cv.age < 40))
    );
    this.seniors$ = this.cvs$.pipe(
      map(cvs => cvs.filter(cv => cv.age >= 40))
    ); 

    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
    
    this.selectedCv =  this.cvService.selectCv$;
  }
  
  selectCategory(category: 'juniors' | 'seniors') {
    this.selectedCategory = category;
  }

  getCurrentCvs(): Observable<Cv[]> {
    return this.selectedCategory === 'juniors' ? this.juniors$ : this.seniors$;
  }


}
  