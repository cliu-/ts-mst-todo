import React, { useState, createRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Layout } from './style';
import { TodoProps, RootStoreProps } from '../../../store';
interface State {
  onEdit: boolean;
}

const Item: React.FC<TodoProps & RootStoreProps> = observer(
  ({ todo, appStore }) => {
    const editInput = createRef<HTMLInputElement>();
    const init: State = { onEdit: false };
    const [state, setState] = useState(init);

    const onBlurEdit = (e: React.FocusEvent<HTMLInputElement>): void => {
      if (e.currentTarget.value.trim().length > 0) {
        setState({ onEdit: false });
      } else {
        appStore.delete(todo);
      }
    };

    const submitEditText = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        if (e.currentTarget.value.trim().length > 0) {
          setState({ onEdit: false });
        }
      }
    };

    // Control Todo's CSS based on complex user interaction
    const SwitchStyle = (onEdit: boolean): string => {
      switch (true) {
        case onEdit && todo.completed:
          return 'completed editing';
        case onEdit && !todo.completed:
          return 'editing';
        case !onEdit && todo.completed:
          return 'completed';
        case !onEdit && !todo.completed:
          return '';

        default:
          return '';
      }
    };

    useEffect(() => {
      // For fucus input element when double clicks text label. fix this https://github.com/laststance/create-react-app-typescript-todo-example-2021/issues/50
      if (state.onEdit === true && editInput.current !== null)
        editInput.current.focus();
    }, [editInput, state.onEdit]);

    return (
      <Layout data-cy="todo-item">
        <li className={SwitchStyle(state.onEdit)} data-testid="todo-item">
          <div className="view" data-testid="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={() => todo.toggleCompleted()}
              data-cy="todo-item-complete-check"
              data-testid="todo-item-complete-check"
            />
            <label
              onDoubleClick={() => setState({ onEdit: true })}
              data-cy="todo-body-text"
              data-testid="todo-body-text"
            >
              {todo.bodyText}
            </label>
            <button
              className="destroy"
              onClick={() => appStore.delete(todo)}
              data-cy="delete-todo-btn"
              data-testid="delete-todo-btn"
            />
          </div>
          <input
            ref={editInput}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => onBlurEdit(e)}
            className="edit"
            value={todo.bodyText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              todo.updateText(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              submitEditText(e)
            }
            data-cy="todo-edit-input"
            data-testid="todo-edit-input"
          />
        </li>
      </Layout>
    );
  }
);

export default Item;
