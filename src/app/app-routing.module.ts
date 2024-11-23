import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";


const routes: Route[] = [

  //lazy loading par routes / par components :
  { path: "ttc" , loadComponent: () => import('./ttc/ttc.component').then(c => c.TtcComponent)},

  { path: "login", loadComponent:()=> import('./auth/login/login.component').then(c=>c.LoginComponent )},

  { path: "rh", loadComponent:()=> import('./optimizationPattern/rh/rh.component').then(c=>c.RhComponent )  },

  { path: "**", loadComponent:()=> import('./components/nf404/nf404.component').then(c=>c.NF404Component ) },


  
  //lazy loading par groupement de route / par module :
  {
    path: 'cv',
    loadChildren: () => import('./cv/cv.module').then((m) => m.CvModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./templates/front/front.module").then((m) => m.FrontRoutingModule),
  },
  {
    path: "admin",
    loadChildren: () => import("./templates/admin/admin.module").then((m) => m.AdminRoutingModule),
  },


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
