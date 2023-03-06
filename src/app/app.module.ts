import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { DistribuidoraServicesService } from '../servicios/distribuidoraService/distribuidora-services.service';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';

const oktaConfig = {
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  clientId: '{clientId}',
  redirectUri: window.location.origin + '/callback'
};


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],

 
  imports: [
    
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatStepperModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    HttpClientModule,
    MatIconModule
    
    
             
  ],
  
  providers: [
    // no need to place any providers due to the `providedIn` flag...
    DistribuidoraServicesService,
    {provide: OKTA_CONFIG, useValue: oktaConfig },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {panelClass: 'mat-dialog-override'}}
    

  ],
  bootstrap: [ AppComponent ],
  entryComponents: [
  ]
  
})
export class AppModule { }