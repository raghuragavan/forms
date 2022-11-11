import { CustomizePipeComponent } from './customize-pipe/customize-pipe.component';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', component: CustomizePipeComponent },

  { path: '', component: ListComponent },

  { path: 'details/:user_id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
