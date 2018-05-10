import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AppConfigProvider } from './config/app-config-provider.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ])
  ],
  providers: [
    AppConfigProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfigProvider: AppConfigProvider) => {
         return () => appConfigProvider.loadConfig();
      },
      multi: true,
      deps: [AppConfigProvider]
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
