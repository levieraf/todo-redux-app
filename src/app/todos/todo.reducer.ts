import { createReducer, on } from '@ngrx/store';
import { crear, editar, eliminar, limpiarCompletados, toggle, toggleAll } from './todo.actions';
import { Todo } from './models/todo.model'

export const estadoInicial: Todo[] = [
  new Todo("Salvar al mundo"),
  new Todo("Vencer a thanos"),
  new Todo("Comprar traje de Ironman"),
  new Todo("Comprar apartamento"),
];

const _todoReducer = createReducer(estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        };
      }

      return todo;
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          texto
        };
      }

      return todo;
    });
  }),
  on(toggleAll, (state, { completado }) => {
    return state.map(todo => {
      return {
        ...todo,
        completado
      }
    });
  }),
  on(limpiarCompletados, (state) => {
    return state.filter(todo => !todo.completado);
  }),
  on(eliminar, (state, { id }) => state.filter(todo => todo.id !== id))
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}