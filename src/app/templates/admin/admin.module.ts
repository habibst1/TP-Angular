import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import {ColorComponent} from "../../components/color/color.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [{ path: "color", component: ColorComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
