import React from 'react';
import * as UUID from 'short-uuid';
import { fireEvent, screen, render } from '@testing-library/react';
import TodoList from './index';
import { IRootStore, RootStore, Todo } from '../../store';

const testAppStore: IRootStore = RootStore.create({
  todoList: ['monster', 'boss black', 'caffe latte'].map((text) =>
    Todo.create({ id: UUID.generate(), bodyText: text })
  ),
});

test('should be render 3 todo items in initialAppState', () => {
  render(<TodoList path="/" appStore={testAppStore} />);
  expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  expect(screen.getByTestId('todo-list').children.length).toBe(3);
  expect(Array.isArray(screen.getAllByTestId('todo-item'))).toBe(true);
  expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent('monster');
  expect(screen.getAllByTestId('todo-item')[1]).toHaveTextContent('boss black');
  expect(screen.getAllByTestId('todo-item')[2]).toHaveTextContent(
    'caffe latte'
  );
});

test('should be work correctly all completed:true|false checkbox toggle button', () => {
  render(<TodoList path="/" appStore={testAppStore} />);

  // toggle on
  fireEvent.click(screen.getByTestId('toggle-all-btn'));
  // should be completed all todo items
  expect(
    (screen.getAllByTestId('todo-item-complete-check')[0] as HTMLInputElement)
      .checked
  ).toBe(true);
  expect(
    (screen.getAllByTestId('todo-item-complete-check')[1] as HTMLInputElement)
      .checked
  ).toBe(true);
  expect(
    (screen.getAllByTestId('todo-item-complete-check')[2] as HTMLInputElement)
      .checked
  ).toBe(true);

  // toggle off
  fireEvent.click(screen.getByTestId('toggle-all-btn'));
  // should be not comleted all todo items
  expect(
    (screen.getAllByTestId('todo-item-complete-check')[0] as HTMLInputElement)
      .checked
  ).toBe(false);
  expect(
    (screen.getAllByTestId('todo-item-complete-check')[1] as HTMLInputElement)
      .checked
  ).toBe(false);
  expect(
    (screen.getAllByTestId('todo-item-complete-check')[2] as HTMLInputElement)
      .checked
  ).toBe(false);
});

test('should be work delete todo button', () => {
  render(<TodoList path="/" appStore={testAppStore} />);

  // delete first item
  fireEvent.click(screen.getAllByTestId('delete-todo-btn')[0]);
  // assertions
  expect(screen.getByTestId('todo-list').children.length).toBe(2);
  expect(Array.isArray(screen.getAllByTestId('todo-item'))).toBe(true);
  expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent('boss black');
  expect(screen.getAllByTestId('todo-item')[1]).toHaveTextContent(
    'caffe latte'
  );
});
