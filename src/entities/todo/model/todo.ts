import { makeAutoObservable } from 'mobx';

import { Todos } from '../TodoList';

class TodoStore {
  todos: Todos[] = [];

  constructor() {
    makeAutoObservable(this);
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

  deleteTodos() {
    this.findCompletedAndDeleteTodo(this.todos);
  }

  get getSelectTodo() {
    return this.flattenTasks(this.todos);
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

  private flattenTasks(tasks: Todos[]) {
    let flattenedTasks: Todos[] = [];

    tasks.forEach((task) => {
      flattenedTasks.push(task);

      if (task.children.length > 0) {
        const childrenTasks = this.flattenTasks(task.children);
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
