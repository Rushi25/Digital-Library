import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    MaterialModule, 
    NavbarComponent,
    FooterComponent
  ]
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
