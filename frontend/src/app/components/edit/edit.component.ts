import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, switchMap } from 'rxjs/operators';


import { IssueService } from 'src/app/issue.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: string;
  issue: any = {};
  updateForm: FormGroup;

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();

    const id$ = this.route.params.pipe(map(({ id }) => id));

    id$.subscribe(id => this.id = id);
    id$
      .pipe(switchMap(id => this.issueService.getById(id)))
      .subscribe(issue => this.updateForm.patchValue(issue));
  }

  private initForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: ''
    });
  }

  updateHandler() {
    this.issueService.update(this.id, this.updateForm.value).subscribe(() => {
      this.snackBar.open('Issue updated', 'Ok', { duration: 3000 });
    });
  }
}
