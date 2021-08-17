import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListViewComponent} from "./list-view/list-view.component";
import {AdminPanelComponent} from "./admin-panel.component";
import {DashboardComponent} from "./dashbboard/dashboard.component";
import {PublicationContentComponent} from "./publication-content/publication-content.component";
import {CreateComponent} from "./create/create.component";
import {EditComponent} from "./edit/edit.component";

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {path: 'list', component: ListViewComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'detail/:id', component: PublicationContentComponent},
      {path: 'create', component:CreateComponent},
      {path: 'detail/edit/:id', component:EditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
