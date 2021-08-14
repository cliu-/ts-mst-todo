import * as mst from 'mobx-state-tree';
import { UUID } from './functions';

export const Todo = mst.types.model('Todo', {
  id: mst.types.optional(mst.types.identifier, UUID()),
  bodyText: mst.types.string,
  completed: mst.types.optional(mst.types.boolean, false),
});

export const RootStore = mst.types
  .model('RootStore', {
    todoList: mst.types.optional(mst.types.array(Todo), []),
  })
  .actions((self) => ({
    addTodo: (text: string) =>
      self.todoList.push(Todo.create({ bodyText: text })),
  }));

type InstanceTodo = mst.Instance<typeof Todo>;
type InstanceRootStore = mst.Instance<typeof RootStore>;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITodo extends InstanceTodo {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IRootStore extends InstanceRootStore {}

export interface RootStoreProps {
  appStore: IRootStore;
}

export interface TodoProps {
  todo: ITodo;
}

export const rootStore = RootStore.create();
