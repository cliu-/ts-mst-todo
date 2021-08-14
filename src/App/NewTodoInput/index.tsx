import React, { createRef } from 'react';
import { observer } from 'mobx-react-lite';
import * as UUID from 'short-uuid';
import { Layout } from './style';

import { RootStoreProps, Todo } from '../../store';

const NewTodoTextInput: React.FC<RootStoreProps> = observer(({ appStore }) => {
  const textInput: React.RefObject<HTMLInputElement> =
    createRef<HTMLInputElement>();

  function addTodo(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (textInput.current === null) return;
    if (e.key === 'Enter' && textInput.current.value.trim().length > 0) {
      appStore.add(
        Todo.create({ id: UUID.generate(), bodyText: textInput.current.value })
      );
      textInput.current.value = '';
    }
  }

  return (
    <Layout>
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          ref={textInput}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addTodo(e)}
          data-testid="new-todo-input-text"
          data-cy="new-todo-input-text"
        />
      </header>
    </Layout>
  );
});
export default NewTodoTextInput;
