import ReactDOM from 'react-dom';
import * as UUID from 'short-uuid';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import { RootStore, Todo } from './store';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const testAppStore = RootStore.create({
    todoList: ['monster', 'boss black', 'caffe latte'].map((text) =>
      Todo.create({ id: UUID.generate(), bodyText: text })
    ),
  });

  ReactDOM.render(
    <Router>
      <Route path="/">
        <App appStore={testAppStore} />
      </Route>
    </Router>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
