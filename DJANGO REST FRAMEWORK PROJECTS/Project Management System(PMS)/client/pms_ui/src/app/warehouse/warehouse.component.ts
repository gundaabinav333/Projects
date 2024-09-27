import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports:[],
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
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
