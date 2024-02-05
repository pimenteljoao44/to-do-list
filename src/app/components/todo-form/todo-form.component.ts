import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToDoSignalsService } from 'src/app/services/to-do-signals.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: [],
})
export class TodoFormComponent {
  constructor(
    private todoSignalService: ToDoSignalsService,
    private dialogRefService: MatDialogRef<HeaderComponent>
  ) {}

  public allTodos = this.todoSignalService.todoState();

  public todoForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  handleCreateNewTodo(): void {
    if (this.todoForm.value && this.todoForm.valid) {
      const title = String(this.todoForm.controls['title'].value);
      const description = String(this.todoForm.controls['description'].value);
      const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
      const done = false;

      this.todoSignalService.updateTodos({ id, title, description, done });
      this.handleCloseModal();
    }
  }

  handleCloseModal(): void {
    this.dialogRefService.close();
  }
}
