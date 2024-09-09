import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Add this line to provide HttpClient globally
    ...appConfig.providers // Spread in existing providers from appConfig
  ]
})
  .catch((err) => console.error(err));
