import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentService } from './student.service';
import { Student } from './student';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'student-app';
  students: Student[] = [];
  studentService = inject(StudentService);

  constructor() {
    this.students = this.studentService.getStudents();
  }
}
