import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { IssueService } from 'src/app/issue.service';
import { Issue } from 'src/app/issue.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  columns = ['title', 'responsible', 'severity', 'status', 'actions'];

  constructor(
    private issueService: IssueService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchIssues();
  }

  private fetchIssues(): void {
    this.issueService
      .get()
      .subscribe((issues: Issue[]) => this.issues = issues);
  }

  editHandler(id: string): void {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteHandler(id: string): void {
    this.issueService
      .delete(id)
      .subscribe(() => this.fetchIssues());
  }
}
