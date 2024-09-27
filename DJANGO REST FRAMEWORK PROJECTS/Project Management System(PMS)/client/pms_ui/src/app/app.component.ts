import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule], // Add HttpClientModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed property name from styleUrl to styleUrls
})
export class AppComponent {
  title = 'pms_ui';
  private apiUrl = 'http://localhost:8000/projects/';
  projects: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.projects = data; 
        console.log('Projects:', this.projects); 
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      },
      complete: () => {
        console.log('Project fetching complete.'); 
      }
    });
  }
}
