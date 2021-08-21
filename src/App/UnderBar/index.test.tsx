import React from 'react';
import * as UUID from 'short-uuid';
import { fireEvent, screen, render } from '@testing-library/react';
import { IRootStore, RootStore, Todo } from '../../store';
import UnderBar from './index';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const renderApp = (testAppStore: IRootStore) =>
  render(
    <Router>
      <Route path="/">
        <UnderBar appStore={testAppStore} path="/" />
      </Route>
    </Router>
  );

test('should show text "0 item left" with 0 todo item', () => {
  const testAppStore: IRootStore = RootStore.create({
    todoList: [],
  });
  renderApp(testAppStore);
  expect(screen.getByTestId('todo-footer')).toBeInTheDocument();
  expect(screen.getByTestId('todo-count')).toHaveTextContent('0 item left');
  expect(screen.queryByTestId('todo-comlelted-clear')).toBeNull();
});

test('should show text "0 item left" with 3 completed todo item, show "Clear completed" button', () => {
  const testAppStore: IRootStore = RootStore.create({
    todoList: ['monster', 'boss black', 'caffe latte'].map((text) =>
      Todo.create({ id: UUID.generate(), bodyText: text, completed: true })
    ),
  });
  renderApp(testAppStore);
  expect(screen.getByTestId('todo-footer')).toBeInTheDocument();
  expect(screen.getByTestId('todo-count')).toHaveTextContent('0 item left');
  expect(screen.getByTestId('todo-comlelted-clear')).toHaveTextContent(
    'Clear completed'
  );
  fireEvent.click(screen.getByTestId('todo-comlelted-clear'));
  expect(screen.getByTestId('todo-count')).toHaveTextContent('0 item left');
  expect(screen.queryByTestId('todo-comlelted-clear')).toBeNull();
});

test('should show text "3 item left" with 3 active todo item', () => {
  const testAppStore: IRootStore = RootStore.create({
    todoList: ['monster', 'boss black', 'caffe latte'].map((text) =>
      Todo.create({ id: UUID.generate(), bodyText: text })
    ),
  });
  renderApp(testAppStore);
  expect(screen.getByTestId('todo-footer')).toBeInTheDocument();
  expect(screen.getByTestId('todo-count')).toHaveTextContent('3 item left');
  expect(screen.queryByTestId('todo-comlelted-clear')).toBeNull();
});

test('should show text "2 item left" with 2 active todo items and 1 completed todo item.', () => {
  const testAppStore: IRootStore = RootStore.create({
    todoList: [
      Todo.create({ id: UUID.generate(), bodyText: 'one', completed: false }),
      Todo.create({ id: UUID.generate(), bodyText: 'two', completed: true }),
      Todo.create({ id: UUID.generate(), bodyText: 'three', completed: false }),
    ],
  });
  renderApp(testAppStore);
  expect(screen.getByTestId('todo-footer')).toBeInTheDocument();
  expect(screen.getByTestId('todo-count')).toHaveTextContent('2 item left');
  expect(screen.getByTestId('todo-comlelted-clear')).toHaveTextContent(
    'Clear completed'
  );
  fireEvent.click(screen.getByTestId('todo-comlelted-clear'));
  expect(screen.getByTestId('todo-count')).toHaveTextContent('2 item left');
  expect(screen.queryByTestId('todo-comlelted-clear')).toBeNull();
});
