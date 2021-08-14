import * as Recoil from 'recoil';

export type Routes = '/' | '/active' | '/completed';

export interface Todo {
  id: string;
  bodyText: string;
  completed: boolean;
}

export type TodoListType = Todo[];

export interface AppState {
  todoList: TodoListType;
}

export enum LocalStorageKey {
  APP_STATE = 'APP_STATE',
}

function LoadAppStateFromLocalStorage(): AppState {
  const stringifiedJSON: string | null = window.localStorage.getItem(
    LocalStorageKey.APP_STATE
  );
  if (typeof stringifiedJSON === 'string') {
    const Loaded: AppState = JSON.parse(stringifiedJSON);
    return Loaded;
  }

  const BlankAppState: AppState = {
    todoList: [],
  };

  return BlankAppState;
}

export const recoilState: Recoil.RecoilState<AppState> = Recoil.atom({
  key: 'initialAppState',
  default: LoadAppStateFromLocalStorage(),
});
