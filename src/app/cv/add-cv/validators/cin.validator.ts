import { inject } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { debounceTime, of, switchMap } from 'rxjs';
import { CvService } from '../../services/cv.service';

export function cinValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const cinControl = form.get('cin');
    const ageControl = form.get('age');

    // Ensure validation runs only when cin changes
    if (cinControl?.valueChanges && !cinControl?.dirty) {
      return null;
    }

    const cin: string = cinControl?.value;
    const age: number = ageControl?.value;

    if (!cin || !age || cin.length !== 8) {
      return null;
    }

    const firstTwoDigits = parseInt(cin.substring(0, 2), 10);

    if (age >= 60 && (firstTwoDigits < 0 || firstTwoDigits > 19)) {
      return { invalidCin: 'For age 60+, first two digits must be between 00 and 19.' };
    }

    if (age < 60 && firstTwoDigits <= 19) {
      return { invalidCin: 'For age below 60, first two digits must be greater than 19.' };
    }

    return null; // Valid
  };
}


export function uniqueCinValidator() {
    const cvService = inject(CvService);
    
    return (control: AbstractControl) => {
        const parentGroup = control?.parent as FormGroup;
        const cinValidationResult = cinValidator()(parentGroup);
        if (!control.value || control.hasError('pattern') || cinValidationResult?.['invalidCin']) {
        return of(null);  
      }
  
      return cvService.checkCinUniqueness(control.value).pipe(
        debounceTime(500),  
        switchMap((isUnique) => {
          
          console.log('CIN uniqueness check result:', isUnique); 
        
          return isUnique ? of(null) : of({ cinTaken: true }); 
        })
      );
    };
  }
