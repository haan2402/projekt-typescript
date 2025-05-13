import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { ScheduleComponent } from './schedule/schedule.component';

export const routes: Routes = [
    { path: 'courses', component: CoursesComponent },
    { path: 'schedule', component: ScheduleComponent},
    { path: '', redirectTo: '/courses', pathMatch: 'full'}
];
