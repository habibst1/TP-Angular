import { Component, inject, signal, effect } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class TodoComponent {
  private todoService = inject(TodoService);

  todos = signal<Todo[]>([]);
  todo = signal(new Todo());
  selectedStatus = signal<string>('');

  filteredTodos = signal<Todo[]>(this.todos());

  constructor() {
    this.todos.set(this.todoService.getTodos());
    this.selectedStatus.set('');
  }

  addTodo() {
    const newTodo = { ...this.todo() };      
    newTodo.id = Math.floor(Math.random() * 1000);
    this.todoService.addTodo(newTodo);

    
    this.todos.set(this.todoService.getTodos());
    this.todo.set(new Todo());
    this.onStatusChange();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
    this.todos.set(this.todoService.getTodos());  
  }

  updateTodoStatus(todo: Todo) {
    this.todoService.updateTodoStatus(todo);
    this.todos.set(this.todoService.getTodos());  
    this.onStatusChange();
  }
  
  filterTodos(status: string) {
    if (!status) {
      return this.todos();
    } else {
      return this.todos().filter(todo => todo.status === status);
    }
  }

  onStatusChange() {
    this.filteredTodos.set(this.filterTodos(this.selectedStatus()));
  }

  get selectedStatusValue() {
    return this.selectedStatus();
  }

  set selectedStatusValue(status: string) {
    this.selectedStatus.set(status);
    this.onStatusChange();
  }
}
