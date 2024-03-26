import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-portfolio';
}
