import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { AuthService } from '../../services/auth.service'; // Import AuthService to handle authentication

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Declares a FormGroup that will hold the form controls (username and password)
  loginForm: FormGroup;

  // The constructor is used to inject dependencies and initialize the form
  constructor(
    private fb: FormBuilder, // FormBuilder is used to create and manage the form
    private authService: AuthService, // AuthService is used to handle the authentication logic
    private router: Router // Router is used to navigate to different routes in the application
  ) {
    // Initializing the loginForm with two form controls: 'username' and 'password'
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // 'username' field, required validation applied
      password: ['', Validators.required], // 'password' field, required validation applied
    });
  }

  // This method is called when the user submits the form
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/admin']); // Redirect to the admin area if login is successful
          } else {
            // Always show the same message on failure
            alert('Login failed: Invalid username or password');
          }
        },
        error: (error) => {
          // Handle all errors the same way
          alert('Login failed: Invalid username or password');
        },
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
