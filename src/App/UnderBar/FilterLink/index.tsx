import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { PathParam } from '../../../store';

const FilterLink: React.FC<PathParam> = observer(({ path }) => {
  return (
    <ul className="filters" data-testid="filters">
      <li>
        <Link
          data-cy="all-filter"
          data-testid="all-filter"
          className={path === '/' ? 'selected' : ''}
          to="/"
        >
          All
        </Link>
      </li>
      <li>
        <Link
          data-cy="active-filter"
          data-testid="active-filter"
          className={path === '/active' ? 'selected' : ''}
          to="/active"
        >
          Active
        </Link>
      </li>
      <li>
        <Link
          data-cy="completed-filter"
          data-testid="completed-filter"
          className={path === '/completed' ? 'selected' : ''}
          to="/completed"
        >
          Completed
        </Link>
      </li>
    </ul>
  );
});

export default FilterLink;
