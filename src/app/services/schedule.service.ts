import { Injectable, signal } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private addedCourses = signal<Course[]>(this.getFromLocalStorage());

  get courses() {
    return this.addedCourses;
  }

  //metod för att lägga till kurs från listan till ramschemat, bara en kurs av varje, inga dubletter
addToList(course: Course): void {
  const courseInList = this.addedCourses(); //detta hämtar den befintliga listan

  //kontroll för att se om kurs redan finns i listan
  const courseAdded = courseInList.find(c => c.courseCode === course.courseCode); 

  if(!courseAdded) {
    const newList = courseInList.slice(); //denna kopierar den gamla listan med kurser
    newList.push(course); //denna lägger till ny kurs till listan
    this.addedCourses.set(newList); //uppdaterar listan i signal jag gjorde tidigare
    this.saveToLocalStorage(newList);
  }
}

//sparar de tillagda kurserna i localstorage
private saveToLocalStorage(courses: Course[]): void {
  localStorage.setItem('addedCourses', JSON.stringify(courses));
}

//denna laddar in de kurser som är sparade till listan
private getFromLocalStorage(): Course [] {
  const data = localStorage.getItem('addedCourses');
  return data ? JSON.parse(data) : [];
}
}
