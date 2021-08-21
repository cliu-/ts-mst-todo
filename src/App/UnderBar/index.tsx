import React from 'react';
import { observer } from 'mobx-react-lite';
import FilterLink from './FilterLink';
import { Layout } from './style';
import { PathParam, RootStoreProps } from '../../store';

const UnderBar: React.FC<RootStoreProps & PathParam> = observer(
  ({ path, appStore }) => {
    return (
      <Layout>
        <footer className="footer" data-testid="todo-footer">
          <span className="todo-count" data-testid="todo-count">
            <strong data-cy="remaining-uncompleted-todo-count">
              {appStore.activeCount}
            </strong>{' '}
            item left
          </span>
          <FilterLink path={path} />

          {appStore.completedCount > 0 && (
            <button
              onClick={appStore.clearCompleted}
              className="clear-completed"
              data-testid="todo-comlelted-clear"
              data-cy="clear-completed-button"
            >
              Clear completed
            </button>
          )}
        </footer>
      </Layout>
    );
  }
);

export default UnderBar;
