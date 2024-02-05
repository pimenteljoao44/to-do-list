import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ToDoSignalsService } from 'src/app/services/to-do-signals.service';
import { ToDoKeyLocalStorage } from 'src/app/models/enum/ToDoKeyLocalStorage';
import { ToDo } from 'src/app/models/model/Todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './todo-card.component.html',
  styleUrls: [],
})
export class TodoCardComponent implements OnInit {
  constructor(private todoSignalService: ToDoSignalsService) {}

  private todosSignal = this.todoSignalService.todoState;
  public todoList = computed(() => this.todosSignal());

  private getTodosInLocalStorage(): void {
    const todosDatas = localStorage.getItem(
      ToDoKeyLocalStorage.TODO_LIST
    ) as string;
    todosDatas && this.todosSignal.set(JSON.parse(todosDatas));
  }

  private saveTodosInLocalStorage(): void {
    this.todoSignalService.saveTodosInLocalStorage();
  }

  public handleDoneTodo(todoId: number): void {
    if (todoId) {
      this.todosSignal.mutate((todos) => {
        const toDoSelected = todos.find((todo) => todo?.id === todoId) as ToDo;
        toDoSelected && (toDoSelected.done = true);
        this.saveTodosInLocalStorage();
      });
    }
  }

  public handleDeleteTodo(todo: ToDo): void {
    if (todo) {
      const index = this.todoList().indexOf(todo);

      if (index !== -1) {
        this.todosSignal.mutate((todos) => {
          todos.splice(index, 1);
          // salvar os dados atuais das todos
          this.saveTodosInLocalStorage();
        });
      }
    }
  }

  public ngOnInit(): void {
    this.getTodosInLocalStorage();
  }
}
