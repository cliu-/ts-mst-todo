import React, { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import Item from './Item';
import { Layout } from './style';
import { ITodo, RootStoreProps, Routes } from '../../store';

const TodoList: React.FC<RootStoreProps & { path: Routes }> = observer(
  ({ appStore, path }) => {
    return (
      <Layout>
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              appStore.todoList.forEach((todo) => {
                if (e.target.checked) {
                  todo.complete();
                } else {
                  todo.active();
                }
              })
            }
            data-cy="toggle-all-btn"
            data-testid="toggle-all-btn"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list" data-testid="todo-list">
            {appStore.todoList
              .filter((todo: ITodo): boolean => {
                switch (path) {
                  case '/':
                    return true;
                  case '/active':
                    return todo.completed === false;
                  case '/completed':
                    return todo.completed === true;
                  default:
                    return true;
                }
              })
              .map(
                (todo: ITodo): ReactElement => (
                  <Item key={todo.id} todo={todo} appStore={appStore} />
                )
              )}
          </ul>
        </section>
      </Layout>
    );
  }
);

export default TodoList;
