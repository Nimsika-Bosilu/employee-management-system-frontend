import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [RouterLink, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  technologies = [
    { name: 'Angular', icon: 'bi-code-slash' },
    { name: 'Spring Boot', icon: 'bi-server' },
    { name: 'MySQL', icon: 'bi-database' },
    { name: 'Bootstrap', icon: 'bi-palette' }
  ];
}
