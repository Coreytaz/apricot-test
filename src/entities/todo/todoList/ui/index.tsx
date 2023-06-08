import { FC } from 'react'
import cn from 'clsx'
import { observer } from 'mobx-react-lite'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Checkbox, Label } from '~shared/ui'
import { todoStore } from '~entities/todo/model'

import { Todos } from '../model'

import cls from './styles.module.scss'

export const TodoList: FC = observer(() => {
    const todos = todoStore.todos

    const renderTodo = (todo: Todos) => (
        <AccordionItem value={`item-${todo.id}`}>
            {todo.children.length > 0 ?
                <>
                    <AccordionTrigger>
                        <div className={cls.wrapperCheckbox}>
                            <Label htmlFor={todo.id.toString()}>{todo.text}</Label>
                            <Checkbox
                                id={todo.id.toString()}
                                checked={todo.completed}
                                onCheckedChange={() => todoStore.handleCheckboxChange(todo)} />
                        </div>
                    </AccordionTrigger>
                    {todo.children.length > 0 && (
                        <AccordionContent>
                            <Accordion type="single" collapsible className="w-full">
                                {todo.children.map((child: Todos) => renderTodo(child))}
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
                            onCheckedChange={() => todoStore.handleCheckboxChange(todo)}
                        />
                    </div>
                </>
            }
        </AccordionItem >
    );

    return (
        <Accordion type="single" collapsible className="w-full">
            {todos.map((todo) => renderTodo(todo))}
        </Accordion>
    );
});
