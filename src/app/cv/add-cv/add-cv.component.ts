import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { APP_ROUTES } from "src/config/routes.config";
import { Cv } from "../model/cv";
import { Store } from "@ngrx/store";
import { selectAddCv, selectCv } from "../store/cv.selectors";
import { updateCv } from "../store/cv.actions";
import { AddCvState } from "../store/cv.state";
import { debounceTime, of, switchMap, take } from "rxjs";
import { cinValidator, uniqueCinValidator } from "./validators/cin.validator";

@Component({
  selector: "app-add-cv",
  templateUrl: "./add-cv.component.html",
  styleUrls: ["./add-cv.component.css"],
})
export class AddCvComponent {
  private cvService = inject(CvService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  cache : string = ""
  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor(private store: Store<AddCvState>) {
    this.ageValidator()

    this.store.select(selectCv).pipe(take(1)).subscribe((cv) => {
      if (cv) {
        this.cache = cv.path
        this.form.patchValue(cv);
        console.log(cv)
        console.log(this.cache)

      }
    });
    this.form.valueChanges.subscribe((value) => {
      this.store.dispatch(updateCv({ cv: value as Cv }));
    });


  }

  form = this.formBuilder.group(
    {
      name: ["", Validators.required],
      firstname: ["", Validators.required],
      path: [""],
      job: ["", Validators.required],
      cin: [
        "",
        {
          validators: [Validators.required, Validators.pattern("[0-9]{8}"),],
          asyncValidators: [uniqueCinValidator()],
          //updateOn: 'blur',  
        },
      ],
      age: [
        0,
        {
          validators: [Validators.required],
          
        },
      ],
    },
     {validators:cinValidator()}
  );
  ageValidator()
  {
    this.age.valueChanges.subscribe(
      (age)=> {
        if (age<18) 
          {
            if(this.path?.value)this.cache=this.path.value ;
            this.path?.setValue("") ;
            this.path?.disable() ; 
          }
          else 
          {
          console.log("cache : ",this.cache)
          this.path?.enable();
          this.path?.setValue(this.cache)
          }
      }

    )
  }

   
  
  addCv() {
    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv) => {
        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(`Le cv ${cv.firstname} ${cv.name}`);
      },
      error: (err) => {
        this.toastr.error(
          `Une erreur s'est produite, Veuillez contacter l'admin`
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get("name")!;
  }
  get firstname() {
    return this.form.get("firstname");
  }
  get age(): AbstractControl {
    return this.form.get("age")!;
  }
  get job() {
    return this.form.get("job");
  }
  get path() {
    return this.form.get("path");
  }
  get cin(): AbstractControl {
    return this.form.get("cin")!;
  }
}
