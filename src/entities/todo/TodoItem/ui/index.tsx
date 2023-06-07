import { FC } from 'react'
import cn from 'clsx'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Checkbox, Label } from '~shared/ui'
import { Todos } from '~entities/todo/todoList';

import cls from './styles.module.scss'

interface TodoItemProps {
    todos: Todos[]
    setTodos: React.Dispatch<React.SetStateAction<Todos[]>>
}

export interface TodoItem {
    todoId: number
    checked: boolean | string
}

export interface CheckboxesState {
    [key: number]: boolean;
}

export const TodoItem: FC<TodoItemProps> = ({ todos, setTodos }) => {
    const handleCheckboxChange = (todo: Todos) => {
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
                t.completed = !t.completed;
                t.children = toggleChildrenCompletion(t.children, t.completed);
            } else {
                t.children = toggleChildrenCompletionForId(t.children, todo.id);

                t.completed =
                    t.children.length > 0
                        ? t.children.every((child) => child.completed)
                        : t.completed;
            }

            return t;
        });

        setTodos(updatedTodos);
    };

    const toggleChildrenCompletion = (children: Todos[], completed: boolean) => {
        return children.map((child) => {
            child.completed = completed;

            if (child.children.length > 0) {
                child.children = toggleChildrenCompletion(child.children, completed);
            }

            return child;
        });
    };

    const toggleChildrenCompletionForId = (children: Todos[], id: number) => {
        return children.map((child) => {
            if (child.id === id) {
                child.completed = !child.completed;

                child.children = toggleChildrenCompletion(
                    child.children,
                    child.completed
                );
            } else {
                child.children = toggleChildrenCompletionForId(child.children, id);

                child.completed =
                    child.children.length > 0
                        ? child.children.every((c) => c.completed)
                        : child.completed;
            }

            return child;
        });
    };

    const renderTodo = (todo: Todos) => (
        <AccordionItem value={`item-${todo.id}`}>
            {todo.children.length > 0 ?
                <>
                    <AccordionTrigger key={todo.id}>
                        <div className={cls.wrapperCheckbox}>
                            <Label htmlFor={todo.id.toString()}>{todo.text}</Label>
                            <Checkbox
                                id={todo.id.toString()}
                                checked={todo.completed}
                                onCheckedChange={() => handleCheckboxChange(todo)} />
                        </div>
                    </AccordionTrigger>
                    {todo.children.length > 0 && (
                        <AccordionContent>
                            <Accordion type="single" collapsible className="w-full">
                                {todo.children.map((child) => renderTodo(child))}
                            </Accordion>
                        </AccordionContent>
                    )
                    }
                </> :
                <>
                    <div className={cn(cls.wrapperCheckbox, cls.AccordionTrigger)}>
                        <Label htmlFor={todo.id.toString()}>{todo.text}</Label>
                        <Checkbox
                            id={todo.id.toString()}
                            checked={todo.completed}
                            onCheckedChange={() => handleCheckboxChange(todo)}
                        />
                    </div>
                </>
            }
        </AccordionItem >
    );

    return (
        <>
            {todos.map((todo) => renderTodo(todo))}
        </>
    );
};
