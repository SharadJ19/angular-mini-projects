import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly STORAGE_KEY = 'todos';
  private todos: Todo[] = [];

  constructor() {
    this.loadTodos();
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string): void {
    const todo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date()
    };

    this.todos.push(todo);
    this.saveTodos();
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) return;

    todo.completed = !todo.completed;
    this.saveTodos();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodos();
  }

  private saveTodos(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
  }

  private loadTodos(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    this.todos = data ? JSON.parse(data) : [];
  }
}
