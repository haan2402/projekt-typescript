import { Component, inject, signal } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from '../services/schedule.service';

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
  subjects = signal<string[]>([]);
  filterSubject = signal<string>('');

  private courseService = inject(CourseService);
  private scheduleService = inject(ScheduleService);

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

    //välj ämne från ämnes listan, sorterar i listan på fallande ordning
    const oneSubject = Array.from(new Set(response.map(course => course.subject))).sort();
    this.subjects.set(oneSubject);
  } catch (error){
    console.error(error);
    this.error.set("Gick inte att ladda in datan - försök igen om en stund!"); 
  }
}

//filtrera kurser i input-fältet på kurskod och kursnamn
useFilter(): void {
  const textFilter = this.filterCourse.toLowerCase();
  const subjectFilter = this.filterSubject();

  const filtered = this.courses().filter(course => 
    (course.courseCode.toLocaleLowerCase().includes(textFilter) ||
    course.courseName.toLocaleLowerCase().includes(textFilter)) &&
    (subjectFilter === '' || course.subject === subjectFilter) //kan endast filtrera på det valda ämnet från listan
  );
  this.filteredCourses.set(filtered);
}

//sortera på antingen kurskod, kursnamn, poäng eller ämne
sortCourse(field: 'courseCode' | 'courseName' | 'points' | 'subject'): void {
  const coursesSorted = this.filteredCourses().sort((a, b) => {
    const firstValue = a[field];
    const secondValue = b[field];

    //kontrollerar om det är text eller siffror den ska sortera på
    if(typeof firstValue === 'string' && typeof secondValue === 'string') {
      return firstValue.localeCompare(secondValue);
    } else {
      return (firstValue as number) - (secondValue as number);
    }
  });
  this.filteredCourses.set(coursesSorted);
}

//hämtar metod för att lägga till kurser till ramschemat
addToList(course: Course): void {
  this.scheduleService.addToList(course);
}

//skriver ut antal kurser som visas på sidan
get amountOfCourses(): number {
  return this.filteredCourses().length;
}

}



