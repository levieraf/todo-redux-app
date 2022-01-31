import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosVarios } from 'src/app/filtro/filtro.actions';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filtroActual: filtrosVarios;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('todos').subscribe(todos => this.todos = todos);
    this.store.subscribe(state => {
      this.todos = state.todos;
      this.filtroActual = state.filtro;
    });
  }

}
