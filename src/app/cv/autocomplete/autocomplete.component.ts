import { Component, inject } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap } from 'rxjs';
import { CvService } from '../services/cv.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  router = inject(Router);

  // initialisation du form
 form = this.formBuilder.group({
    search: [''],
  });

  // recuperation de la valeur dans search
  get search(): AbstractControl {
    return this.form.get('search')!;
  }

 
 
  filteredCvs$: Observable<any[]> = of([]);

  constructor() {
    this.filteredCvs$ = this.search.valueChanges.pipe(
      debounceTime(500), 
      distinctUntilChanged(),
      switchMap((value) =>  this.cvService.searchCvs(value)),
      catchError((error) => {
        console.error('Error fetching CVs:', error);
        return of([]);
      })
    );
  }
}
