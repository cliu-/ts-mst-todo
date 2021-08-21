import React from 'react';
import * as UUID from 'short-uuid';
import { fireEvent, screen, render } from '@testing-library/react';
import { IRootStore, RootStore, Todo } from '../../store';
import { ITodo } from '../store';
import App from './index';

const testTodos: Array<ITodo> = ['monster', 'boss black', 'caffe latte'].map(
  (text) => Todo.create({ id: UUID.generate(), bodyText: text })
);

const testAppStore: IRootStore = RootStore.create({
  todoList: [],
});

test('should be initialized with 0 todo item', () => {
  render(<App appStore={testAppStore} />);
  expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  expect(screen.getByTestId('todo-list')).toBeEmptyDOMElement();
});

test('should be NO UnderBar displayed when 0 todo item', () => {
    render(<App appStore={testAppStore} />);
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByTestId('todo-list')).toBeEmptyDOMElement();
  });

test('should be render 3 todo items in initialAppState', () => {
  render(<App appStore={testAppStore} />);
  expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  expect(screen.getByTestId('todo-list').children.length).toBe(3);
  expect(Array.isArray(screen.getAllByTestId('todo-item'))).toBe(true);
  expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent('monster');
  expect(screen.getAllByTestId('todo-item')[1]).toHaveTextContent('boss black');
  expect(screen.getAllByTestId('todo-item')[2]).toHaveTextContent(
    'caffe latte'
  );
});
