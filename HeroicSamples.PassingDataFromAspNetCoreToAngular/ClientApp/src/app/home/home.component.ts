import { Component } from '@angular/core';
import { AppConfigProvider, AppConfig } from '../config/app-config-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  appConfig: AppConfig;

  constructor(
    private appConfigProvider: AppConfigProvider
  ) {
    this.appConfig = appConfigProvider.getConfig();
  }
}
