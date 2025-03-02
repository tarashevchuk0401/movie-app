import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withDebugTracing} from '@angular/router';

import { routes } from './app.routes';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom} from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
  ],

};
