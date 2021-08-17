import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {AdminPanelComponent} from "./admin-panel.component";
import {FirebaseService} from "../services/firebase.service";
import {AdminPanelRoutingModule} from "./admin-panel-routing.module";
import {ListViewComponent} from "./list-view/list-view.component";
import {CommonModule} from "@angular/common";
import {PublicationContentComponent} from "./publication-content/publication-content.component";
import {ShareButtonsModule} from "ngx-sharebuttons/buttons";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateComponent} from "./create/create.component";
import {EditComponent} from "./edit/edit.component";

@NgModule({
  declarations: [
    AdminPanelComponent,
    ListViewComponent,
    PublicationContentComponent,
    CreateComponent,
    EditComponent
  ],
    imports: [
        RouterModule,
        AdminPanelRoutingModule,
        CommonModule,
        ShareButtonsModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [FirebaseService,FormsModule],
  bootstrap: [AdminPanelComponent]
})
export class AdminPanelModule { }
