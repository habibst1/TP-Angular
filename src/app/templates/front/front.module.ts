import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FrontComponent } from "./front.component";
import { TodoComponent } from "../../todo/todo/todo.component";
import { MiniWordComponent } from "../../directives/mini-word/mini-word.component";

const routes: Routes = [
  {
    path: "",
    component: FrontComponent,
    children: [
      { path: "todo", component: TodoComponent },
      { path: "word", component: MiniWordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontRoutingModule {}
