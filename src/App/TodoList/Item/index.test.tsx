import React from 'react';
import { observer } from 'mobx-react-lite';
import * as UUID from 'short-uuid';
import { fireEvent, render, screen } from '@testing-library/react';
import Item from './index';
import {
  IRootStore,
  ITodo,
  RootStore,
  RootStoreProps,
  Todo,
} from '../../../store';
import { onSnapshot } from 'mobx-state-tree';

const testTodo: ITodo = Todo.create({
  id: UUID.generate(),
  bodyText: 'cut tomato',
});

const testAppStore: IRootStore = RootStore.create({ todoList: [testTodo] });

const App: React.FC<RootStoreProps> = observer(({ appStore }) => {
  if (appStore.todoList.length === 0) return null;
  return (
    <div>
      {appStore.todoList.map((t) => (
        <Item key={t.id} todo={t} appStore={appStore} />
      ))}
    </div>
  );
});

onSnapshot(testAppStore, (snapshot) => console.log(snapshot));

test('should each initialAppstate todo object value is set to Item element', () => {
  render(<Item todo={testTodo} appStore={testAppStore} />);

  expect(screen.getByTestId('todo-item')).toBeInTheDocument();

  expect(
    (screen.getByTestId('todo-item-complete-check') as HTMLInputElement).checked
  ).toBe(false);

  expect(screen.getByTestId('todo-body-text')).toHaveTextContent('cut tomato');

  expect(
    (screen.getByTestId('todo-edit-input') as HTMLInputElement).value
  ).toBe('cut tomato');
});

test('should set css classes correctly', () => {
  render(<App appStore={testAppStore} />);

  // when not.completed & not.onEdit, SwitchStyle doesn't show .completed .editting selectors
  expect(screen.getByTestId('todo-item')).not.toHaveClass('completed');
  expect(screen.getByTestId('todo-item')).not.toHaveClass('editing');
});

test('should work todo completed checkbox', () => {
  render(<App appStore={testAppStore} />);

  // click complete checkbox then should appear completed class
  fireEvent.click(screen.getByTestId('todo-item-complete-check'));
  expect(
    (screen.getByTestId('todo-item-complete-check') as HTMLInputElement).checked
  ).toBe(true);
  expect(screen.getByTestId('todo-item')).toHaveClass('completed');

  // should working as toggle
  fireEvent.click(screen.getByTestId('todo-item-complete-check'));
  expect(
    (screen.getByTestId('todo-item-complete-check') as HTMLInputElement).checked
  ).toBe(false);
  expect(screen.getByTestId('todo-item')).not.toHaveClass('completed');
});

test('should work edit mode and toggle show/hide', () => {
  render(<App appStore={testAppStore} />);

  // by default, edit input form is not visible
  expect(screen.getByTestId('todo-edit-input')).not.toBeVisible();
  // double click todo text label, then focus and enable todo text edit code
  fireEvent.doubleClick(screen.getByTestId('todo-body-text'));
  expect(screen.getByTestId('todo-item')).toHaveClass('editing');
  expect(screen.getByTestId('todo-edit-input')).toBeVisible();
  expect(screen.getByTestId('todo-edit-input')).toHaveFocus();
  fireEvent.change(screen.getByTestId('todo-edit-input'), {
    target: { value: 'cut tomato plus' },
  });
  fireEvent.keyDown(screen.getByTestId('todo-edit-input'), { key: 'Enter' });

  expect(screen.getByTestId('todo-body-text')).toHaveTextContent(
    'cut tomato plus'
  );
  expect(screen.getByTestId('todo-item')).not.toHaveClass('editing');
  expect(screen.getByTestId('todo-edit-input')).not.toBeVisible();

  // double click todo text label, then focus and enable todo text edit code
  fireEvent.doubleClick(screen.getByTestId('todo-body-text'));
  expect(screen.getByTestId('todo-item')).toHaveClass('editing');
  expect(screen.getByTestId('todo-edit-input')).toBeVisible();
  expect(screen.getByTestId('todo-edit-input')).toHaveFocus();
  fireEvent.change(screen.getByTestId('todo-edit-input'), {
    target: { value: 'cut tomato plus plus' },
  });
  fireEvent.keyDown(screen.getByTestId('todo-edit-input'), { key: 'Escape' });
  expect(screen.getByTestId('todo-body-text')).toHaveTextContent(
    'cut tomato plus plus'
  );
  expect(screen.getByTestId('todo-item')).not.toHaveClass('editing');
  expect(screen.getByTestId('todo-edit-input')).not.toBeVisible();
});

test('delete todo item', () => {
  render(<App appStore={testAppStore} />);

  // click delete button, then todo item is removed
  expect(screen.getByTestId('todo-item')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('delete-todo-btn'));
  expect(screen.queryByTestId('todo-item')).toBe(null);
});

test('add todo item', () => {
  render(<App appStore={testAppStore} />);
  const newTodo: ITodo = Todo.create({
    id: UUID.generate(),
    bodyText: 'cut tomato plush',
  });
  testAppStore.add(newTodo);

  expect(screen.getAllByTestId('todo-item').length).toBe(1);
  expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent(
    'cut tomato plush'
  );
});
