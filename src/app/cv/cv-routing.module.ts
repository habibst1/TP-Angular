// src/app/cv/cv-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from './cv/cv.component';
import { AddCvComponent } from './add-cv/add-cv.component';
import { DetailsCvComponent } from './details-cv/details-cv.component';
import { AuthGuard } from "../auth/guards/auth.guard";
import { CvResolver } from './services/CvResolver';
import { MasterDetailsCvComponent } from './master-details-cv/master-details-cv.component';

const routes: Routes =[
    {
      path: '',
      component: CvComponent,
      resolve: {
        cvs: CvResolver, 
      },
    },
    { path: "list",
       component: MasterDetailsCvComponent, 
         children : [
         {path: ":id" , component : DetailsCvComponent}
        ]
       },
    { path: 'add', component: AddCvComponent, canActivate: [AuthGuard] },
    { path: ':id', component: DetailsCvComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvRoutingModule {}
