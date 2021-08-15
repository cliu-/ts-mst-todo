import React from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import * as history from 'history';
import NewTodoInput from './NewTodoInput';
import TodoList from './TodoList';
import UnderBar from './UnderBar';
import Copyright from './Copyright';
import { Layout } from './style';
import { rootStore, RootStoreProps, Routes } from '../store';
import { NotFound } from './NotFound';

const App: React.FC<RootStoreProps> = observer(({ appStore }) => {
  const { pathname } = useLocation<history.Location>();
  return Routes.includes(pathname) ? (
    <Layout>
      <section className="todoapp">
        <NewTodoInput appStore={rootStore} />
        {appStore.todoList.length ? (
          <>
            <TodoList path={pathname} appStore={appStore} />
            <UnderBar path={pathname} appStore={appStore} />
          </>
        ) : null}
      </section>
      <Copyright />
    </Layout>
  ) : (
    <NotFound />
  );
});

export default App;
