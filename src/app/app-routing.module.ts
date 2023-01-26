import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { LogginComponent } from './loggin/loggin.component';
import { DashboardComponent } from './dashboard/dashboard.component';




const routes: Routes = [
  { path: '', component:  DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }