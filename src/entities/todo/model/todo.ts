import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { Todos } from '../TodoList';

class TodoStore {
  search: string = '';
  todos: Todos[] = [
    {
      id: 1,
      text: 'Task 1',
      completed: false,
      children: [
        {
          id: 2,
          text: 'Subtask 1.1',
          completed: false,
          children: [],
        },
        {
          id: 3,
          text: 'Subtask 1.2',
          completed: false,
          children: [
            {
              id: 4,
              text: 'Subsubtask 1.2.1',
              completed: false,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 5,
      text: 'Task 2',
      completed: false,
      children: [],
    },
  ];

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'todoStore',
      properties: ['todos'],
      storage: window.localStorage,
    });
  }

  handleCheckboxChange(todo: Todos) {
    this.todos = this.todos.map((t) => {
      if (t.id === todo.id) {
        t.completed = !t.completed;
        t.children = this.toggleChildrenCompletion(t.children, t.completed);
      } else {
        t.children = this.toggleChildrenCompletionForId(t.children, todo.id);

        t.completed =
          t.children.length > 0 ? t.children.every((child: Todos) => child.completed) : t.completed;
      }

      return t;
    });
  }

  setSearch(search: string) {
    this.search = search;
  }

  deleteTodos() {
    this.findCompletedAndDeleteTodo(this.todos);
  }

  get todoList() {
    return this.findAllTasksByText(this.todos, this.search);
  }

  get getSelectTodo() {
    return this.flattenTasks(this.todos, () => true);
  }

  get getAllCompletedTodo() {
    return this.flattenTasks(this.todos, (task) =>
      task.completed === true && task.children.length === 0 ? true : false
    );
  }

  addTodo(newTodos: Todos, todoId: number | null) {
    if (todoId === null) {
      this.todos.push(newTodos);

      return;
    }

    this.addElementById(this.todos, todoId, newTodos);
  }

  addElementById(obj: Todos[], todoId: number | null, newTodos: Todos) {
    for (const task of obj) {
      if (task.id === todoId) {
        task.children.push(newTodos);

        return;
      }

      if (task.children.length > 0) {
        this.addElementById(task.children, todoId, newTodos);
      }
    }
  }

  private findAllTasksByText(tasks: Todos[], searchText: string) {
    if (searchText === '') {
      return tasks;
    }

    const foundTasks = [];

    for (const task of tasks) {
      if (task.text.includes(searchText)) {
        foundTasks.push(task);
      }

      if (task.children && task.children.length > 0) {
        const foundChildTasks = this.findAllTasksByText(task.children, searchText) as Todos[];

        if (foundChildTasks.length > 0) {
          foundTasks.push(...foundChildTasks);
        }
      }
    }

    return foundTasks;
  }

  private flattenTasks(tasks: Todos[], condition?: (task: Todos) => boolean) {
    let flattenedTasks: Todos[] = [];

    tasks.forEach((task) => {
      if (condition && condition(task)) {
        flattenedTasks.push(task);
      }

      if (task.children.length > 0) {
        const childrenTasks = this.flattenTasks(task.children, condition);
        flattenedTasks = flattenedTasks.concat(childrenTasks);
      }
    });

    return flattenedTasks;
  }

  private findCompletedAndDeleteTodo(obj: Todos[]) {
    const todoId: number[] = [];

    for (const [i, task] of obj.entries()) {
      if (task.completed === true) {
        todoId.push(i);
        continue;
      }

      if (task.children.length > 0) {
        this.findCompletedAndDeleteTodo(task.children);
      }
    }

    todoId
      .slice()
      .reverse()
      .forEach((item) => obj.splice(item, 1));
  }

  private toggleChildrenCompletion(children: Todos[], completed: boolean) {
    return children.map((child) => {
      child.completed = completed;

      if (child.children.length > 0) {
        child.children = this.toggleChildrenCompletion(child.children, completed);
      }

      return child;
    });
  }

  private toggleChildrenCompletionForId(children: Todos[], id: number) {
    return children.map((child) => {
      if (child.id === id) {
        child.completed = !child.completed;

        child.children = this.toggleChildrenCompletion(child.children, child.completed);
      } else {
        child.children = this.toggleChildrenCompletionForId(child.children, id);

        child.completed =
          child.children.length > 0
            ? child.children.every((c: Todos) => c.completed)
            : child.completed;
      }

      return child;
    });
  }
}

export const todoStore = new TodoStore();
