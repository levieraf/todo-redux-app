import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/filtro/filtro.actions';
import { limpiarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  filtroActual: actions.filtrosVarios = 'todos';
  filtros: actions.filtrosVarios[] = ['todos', 'completados', 'pendientes'];
  pendientes: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.subscribe(({ filtro, todos }) => {
      this.filtroActual = filtro;
      this.pendientes = todos.filter(todo => !todo.completado).length;
    });
  }

  filtroSeleccionado(filtro: actions.filtrosVarios) {
    this.store.dispatch(actions.setFiltro({ filtro }));
  }

  limpiarCompletados() {
    this.store.dispatch(limpiarCompletados());
  }
}