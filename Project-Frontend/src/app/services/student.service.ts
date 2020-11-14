import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api/students';


  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization:'Bearer ' + this.currentUser.token,
      "Content-Type":"application/json; charset=UTF-8"
    });
  }


  getClassStudents(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/classroom/${name}`, {headers: this.headers});
  }

  createStudent(students: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, students, {headers: this.headers});
  }

  updateStudent(userId: string, students: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${userId}`, students, {headers: this.headers});
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {headers: this.headers});
  }


  getClassRooms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/classrooms`, {headers: this.headers});
  }
}

