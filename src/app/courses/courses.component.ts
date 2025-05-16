import { Component, inject, signal } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  //gör signals jag behöver för hämta kurser, filtrera och sortera, även en för error
  courses = signal<Course[]>([]);
  filteredCourses = signal<Course[]>([]);
  error = signal<string | null>(null);
  filterCourse: string = '';

  private courseService = inject(CourseService);

  ngOnInit() {
    this.loadCourses();
  }

//hämtar in kurser från json-fil
async loadCourses() {
  try {
    const response = await this.courseService.loadCourses();
    this.courses.set(response);
    this.filteredCourses.set(response);
    console.table(this.courses());
  } catch (error){
    console.error(error);
    this.error.set("Gick inte att ladda in datan - försök igen om en stund!"); 
  }
}

//filtrera kurser i input-fältet på kurskod och kursnamn
useFilter(): void {
  const textFilter = this.filterCourse.toLowerCase();

  const filtered = this.courses().filter(course => 
    course.courseCode.toLocaleLowerCase().includes(textFilter) ||
    course.courseName.toLocaleLowerCase().includes(textFilter)
  );
  this.filteredCourses.set(filtered);
}


}



