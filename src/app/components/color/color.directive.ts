import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[apparcenciel]',
  standalone: true,
})
export class ColorDirective {
  colors: string[] = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

  @HostBinding('style.color') textColor!: string;
  @HostBinding('style.border-color') borderColor!: string;


  @HostListener('keydown') newColor() {
    this.changeColor();
  }

   changeColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    const randomColor = this.colors[randomIndex];
    this.textColor = randomColor;
    this.borderColor = randomColor;
  }
}
