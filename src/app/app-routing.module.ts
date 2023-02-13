import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { LogginComponent } from './loggin/loggin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuzonComponent } from './buzon/buzon.component';




const routes: Routes = [
  { path: '',       component:LogginComponent},
  { path: 'heroes', component:HeroesComponent},
  { path: 'holdb',  component:DashboardComponent},
  { path: 'loggin', component:LogginComponent},
  { path: 'buzon',  component:BuzonComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }