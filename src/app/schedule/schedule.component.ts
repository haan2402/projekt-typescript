import { Component, inject } from '@angular/core';
import { ScheduleService } from '../services/schedule.service';
import { Course } from '../models/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  //hämtar funktioner från schedule service
  private scheduleService = inject(ScheduleService);

  //för att komma åt listan med kurser som är tillagda
  get addedCourses(): Course[] {
  return this.scheduleService.courses();
}

//för att ta bort en kurs från ramschemat
removeFromList(courseCode: string): void {
  this.scheduleService.removeCourse(courseCode);
}
}
