import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  courses = [{
    id: 1,
    title: 'C#',
    description: 'Course for C#',
    image: ''
  }, {
    id: 2,
    title: 'HTML',
    description: 'Course for HTML',
    image: ''
  }, {
    id: 3,
    title: 'CSS',
    description: 'Course for CSS',
    image: ''
  }
  ]
}
