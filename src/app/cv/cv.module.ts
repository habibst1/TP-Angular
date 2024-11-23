
// @NgModule({
//   declarations: [CvComponent],
//   imports: [
//     CommonModule,
//     RouterModule.forChild([
//       { path: '', component: CvComponent }, 
//     ]),
//   ],
// })

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvRoutingModule } from './cv-routing.module';
import { CvComponent } from './cv/cv.component';
import { AddCvComponent } from './add-cv/add-cv.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';

@NgModule({

  imports: [
    CommonModule,
    CvRoutingModule, ],
})
export class CvModule {}
