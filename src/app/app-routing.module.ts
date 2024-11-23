import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";


const routes: Route[] = [
  
  //lazy loading par groupement de route / par module :
  {
    path: 'cv',
    loadChildren: () => {console.log('Loading CV module...');
    return import('./cv/cv.module').then((m) => m.CvModule)},
  },
  {
    path: "admin",
    loadChildren: () => {console.log("loading admin( color ) module"); 
      return import("./templates/admin/admin.module").then((m) => m.AdminRoutingModule)},
  },
  {
    path: "",
    loadChildren: () => {console.log("loading front ( todo , word ) module"); 
    return import("./templates/front/front.module").then((m) => m.FrontRoutingModule)},
  },


  //lazy loading par routes / par components :
  { path: "ttc" , loadComponent: () => {console.log("loading ttc component") ;
    return import('./ttc/ttc.component').then(c => c.TtcComponent)}},

  { path: "login", loadComponent:()=> { console.log("loading login component")
    return import('./auth/login/login.component').then(c=>c.LoginComponent )}},

  { path: "rh", loadComponent:()=> { console.log("loading rh component")
    return import('./optimizationPattern/rh/rh.component').then(c=>c.RhComponent )  }},

  { path: "**", loadComponent:()=> import('./components/nf404/nf404.component').then(c=>c.NF404Component ) },



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
