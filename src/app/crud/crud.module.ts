import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CrudComponent } from './crud.component';



@NgModule({
  declarations: [
    CrudComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'crud', component: CrudComponent },
    ]),
    SharedModule
  ]
})
export class CrudModule { }
