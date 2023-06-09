import { FC } from 'react'
import cn from 'clsx'
import { observer } from 'mobx-react-lite'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Checkbox, Label } from '~shared/ui'
import { todoStore } from '~entities/todoStore'

import { Todos } from '../model'

import cls from './styles.module.scss'

export const TodoList: FC = observer(() => {
    const todos = todoStore.todoList

    const renderTodo = (todo: Todos) => (
        <AccordionItem key={todo.id} value={`item-${todo.id}`}>
            {todo.children.length > 0 ?
                <>
                    <AccordionTrigger>
                        <div className={cls.wrapperCheckbox}>
                            <Label htmlFor={todo.id.toString()}>{todo.text}</Label>
                            <Checkbox
                                id={todo.id.toString()}
                                checked={todo.completed}
                                onChange={() => todoStore.handleCheckboxChange(todo)} />
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
                            onChange={() => todoStore.handleCheckboxChange(todo)}
                        />
                    </div>
                </>
            }
        </AccordionItem >
    );

    return (
        <Accordion type="single" collapsible className="w-full">
            {todos?.length! > 0 ? todos?.map((todo) => renderTodo(todo)) : <div style={{ textAlign: 'center', marginTop: '1rem' }}>Не удалось найти To-Do</div>}
        </Accordion>
    );
});
