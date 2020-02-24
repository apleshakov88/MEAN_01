import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private readonly uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(`${this.uri}/issues`);
  }

  getById(id: string) {
    return this.http.get(`${this.uri}/issues/${id}`);
  }

  add(issue: { title, responsible, description, severity, status? }) {
    return this.http.post(`${this.uri}/issues/add`, issue);
  }

  update(id, issue: { title?, responsible?, description?, severity?, status? }) {
    return this.http.post(`${this.uri}/issues/update`, issue);
  }

  delete(id: string) {
    return this.http.get(`${this.uri}/issues/delete/${id}`);
  }
}
