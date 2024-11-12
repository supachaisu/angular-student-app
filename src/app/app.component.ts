import { Component, inject } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from './student';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'student-app';
  studentService = inject(StudentService);

  get students(): Student[] {
    return this.studentService.getStudents();
  }

  addStudentForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  submitAddStudentForm(): void {
    if (this.addStudentForm.invalid) {
      // Find first invalid input and focus it
      const firstInvalidInput = document.querySelector(
        'form input:invalid'
      ) as HTMLInputElement;
      firstInvalidInput?.focus();
      return;
    }

    if (
      !this.addStudentForm.value.firstName ||
      !this.addStudentForm.value.lastName
    ) {
      return;
    }

    this.studentService.addStudent({
      id: crypto.randomUUID(),
      firstName: this.addStudentForm.value.firstName,
      lastName: this.addStudentForm.value.lastName,
      isEditing: false,
    });
  }

  toggleEdit(student: Student): void {
    student.isEditing = !student.isEditing;
    this.studentService.editStudent(student);
  }

  deleteStudent(student: Student): void {
    this.studentService.removeStudent(student);
  }
}
