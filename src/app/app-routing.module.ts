import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { TodoComponent } from "./todo/todo/todo.component";
import { MiniWordComponent } from "./directives/mini-word/mini-word.component";
import { ColorComponent } from "./components/color/color.component";
import { FrontComponent } from "./templates/front/front.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { AddCvComponent } from "./cv/add-cv/add-cv.component";
import { CvComponent } from "./cv/cv/cv.component";
import { DetailsCvComponent } from "./cv/details-cv/details-cv.component";
import { RhComponent } from "./optimizationPattern/rh/rh.component";
import { TtcComponent } from "./ttc/ttc.component";




const routes: Route[] = [

  { path: "ttc" , loadComponent: () => import('./ttc/ttc.component')
    .then(c => c.TtcComponent)},

  { path: "login", loadComponent:()=> import('./auth/login/login.component').then(c=>c.LoginComponent )},


  { path: "rh", loadComponent:()=> import('./optimizationPattern/rh/rh.component').then(c=>c.RhComponent )  },


  {
    path: "cv",
    component: CvComponent,
  },
  { path: "cv/add", component: AddCvComponent, canActivate: [AuthGuard] },
  { path: "cv/:id", component: DetailsCvComponent },
  {
    path: "",
    component: FrontComponent,
    children: [
      { path: "todo", component: TodoComponent },
      { path: "word", component: MiniWordComponent },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [{ path: "color", component: ColorComponent }],
  },

  
  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
