import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  newTodo = '';

  constructor(private todoService: TodoService) {}

  get todos(): Todo[] {
    return this.todoService.getTodos();
  }

  addTodo(): void {
    if (!this.newTodo.trim()) return;
    this.todoService.addTodo(this.newTodo);
    this.newTodo = '';
  }

  toggle(todo: Todo): void {
    this.todoService.toggleTodo(todo.id);
  }

  delete(todo: Todo): void {
    this.todoService.deleteTodo(todo.id);
  }
}
