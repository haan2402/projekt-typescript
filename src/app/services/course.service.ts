import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  //hämtar json fil från public
  private url: string = '/miun_courses.json';

  http = inject(HttpClient);

  async loadCourses(): Promise<Course[]> {
    const courses = this.http.get<Course[]>(this.url);
    return await firstValueFrom(courses);
  }
}
