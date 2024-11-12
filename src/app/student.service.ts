import { Injectable } from '@angular/core';
import type { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];

  getStudents(): Student[] {
    return this.students;
  }

  getStudent(id: string): Student | undefined {
    return this.students.find((s) => s.id === id);
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  editStudent(student: Student): void {
    const index = this.students.findIndex((s) => s.id === student.id);
    this.students[index] = student;
  }

  removeStudent(student: Student): void {
    this.students = this.students.filter((s) => s.id !== student.id);
  }
}
