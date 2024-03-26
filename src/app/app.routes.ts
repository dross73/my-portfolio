import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResumeComponent } from './resume/resume.component';

export const routes: Routes = [
  {'path': '', component:AboutComponent},
  {'path':'about', component:AboutComponent},
  {'path':'contact', component:ContactComponent},
  {'path':'projects', component:ProjectsComponent},
  {'path':'resume', component:ResumeComponent},

];
