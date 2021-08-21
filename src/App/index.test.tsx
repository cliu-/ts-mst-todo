import React from 'react';
import * as UUID from 'short-uuid';
import { fireEvent, screen, render } from '@testing-library/react';
import { IRootStore, RootStore, Todo } from '../store';
import App from './index';
import { Route, BrowserRouter } from 'react-router-dom';

const renderApp = (testAppStore: IRootStore) =>
  render(
    <BrowserRouter>
      <Route>
        <App appStore={testAppStore} />
      </Route>
    </BrowserRouter>
  );

const testAppStore: IRootStore = RootStore.create({
  todoList: [
    Todo.create({ id: UUID.generate(), bodyText: 'one', completed: false }),
    Todo.create({ id: UUID.generate(), bodyText: 'two', completed: true }),
    Todo.create({ id: UUID.generate(), bodyText: 'three', completed: false }),
    Todo.create({ id: UUID.generate(), bodyText: 'four', completed: true }),
  ],
});

test('should render correctly', () => {
  renderApp(testAppStore);
  expect(screen.getByText('todos')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('What needs to be done?')
  ).toBeInTheDocument();
  expect(screen.getByTestId('todo-count')).toHaveTextContent('2 item left');
  expect(screen.getByTestId('todo-comlelted-clear')).toHaveTextContent(
    'Clear completed'
  );
});

test('should go to "active" URL path when click "Active" UnderBar button', () => {
  renderApp(testAppStore);
  fireEvent.click(screen.getByTestId('active-filter'));
  expect(window.location.pathname).toBe('/active');
  expect(screen.getByTestId('todo-count')).toHaveTextContent('2 item left');
  expect(screen.getByTestId('todo-list').children.length).toBe(2);
  expect(Array.isArray(screen.getAllByTestId('todo-item'))).toBe(true);
  expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent('one');
  expect(screen.getAllByTestId('todo-item')[1]).toHaveTextContent('three');
});

test('should go to "completed" URL path when click "Completed" UnderBar button', () => {
  renderApp(testAppStore);
  fireEvent.click(screen.getByTestId('completed-filter'));
  expect(window.location.pathname).toBe('/completed');
  expect(screen.getByTestId('todo-count')).toHaveTextContent('2 item left');
  expect(screen.getByTestId('todo-list').children.length).toBe(2);
  expect(Array.isArray(screen.getAllByTestId('todo-item'))).toBe(true);
  expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent('two');
  expect(
    (screen.getAllByTestId('todo-item-complete-check')[0] as HTMLInputElement)
      .checked
  ).toBe(true);
  expect(screen.getAllByTestId('todo-item')[1]).toHaveTextContent('four');
  expect(
    (screen.getAllByTestId('todo-item-complete-check')[1] as HTMLInputElement)
      .checked
  ).toBe(true);
});

test('should show all items when click "All" UnderBar button', () => {
  renderApp(testAppStore);
  fireEvent.click(screen.getByTestId('all-filter'));
  expect(window.location.pathname).toBe('/');
  expect(screen.getByTestId('todo-count')).toHaveTextContent('2 item left');
  expect(screen.getByTestId('todo-list').children.length).toBe(4);
  expect(Array.isArray(screen.getAllByTestId('todo-item'))).toBe(true);
  expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent('one');
  expect(screen.getAllByTestId('todo-item')[1]).toHaveTextContent('two');
  expect(
    (screen.getAllByTestId('todo-item-complete-check')[1] as HTMLInputElement)
      .checked
  ).toBe(true);
  expect(screen.getAllByTestId('todo-item')[2]).toHaveTextContent('three');
  expect(screen.getAllByTestId('todo-item')[3]).toHaveTextContent('four');
  expect(
    (screen.getAllByTestId('todo-item-complete-check')[3] as HTMLInputElement)
      .checked
  ).toBe(true);
});

test('new item should list at top', () => {
  renderApp(testAppStore);
  const input = screen.getByTestId('new-todo-input-text');
  fireEvent.change(input, {
    target: { value: 'should at top' },
  });
  fireEvent.keyPress(input, {
    key: 'Enter',
    code: 13,
    charCode: 13, // I had issue that doesn't trigger keyPress event relevant charCode. https://github.com/testing-library/react-testing-library/issues/269
  });
  expect(screen.getByTestId('todo-count')).toHaveTextContent('3 item left');
  expect(screen.getByTestId('todo-list').children.length).toBe(5);
  expect(Array.isArray(screen.getAllByTestId('todo-item'))).toBe(true);
  expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent(
    'should at top'
  );
});
