import { Component, Input, OnInit, inject, Directive } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { debounceTime } from 'rxjs';
import { ColorDirective } from 'src/app/components/color/color-directive.directive';

@Component({
    selector: "app-color",
    templateUrl: "./color.component.html",
    styleUrls: ["./color.component.css"],
    standalone: true,
    imports:[ColorDirective]
})
export class ColorComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  @Input() defaultColor = "red";
  /**
   *
   * The color representing the Div
   */
  divColor = "";

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  /**
   * It change the div backgound color
   *
   * @param newColor: string
   */

  constructor() {
    console.log("In constructor", this.defaultColor);
  }

  ngOnInit(): void {
    console.log("In ngOnInit", this.defaultColor);
    this.divColor = this.defaultColor;
  }

  changeColor(newColor: string) {
    this.divColor = newColor;
  }
}
