import { Component, Input, Output, EventEmitter, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent {
  private cvService = inject(CvService);

  @Input({ required: true }) cv!: Cv;
  @Input() size = 50;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  constructor() {}

  onSelectCv() {
    this.cvService.selectCv(this.cv);
  }
}
