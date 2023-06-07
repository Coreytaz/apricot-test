import { FC, useState } from 'react'

import { TodoItem } from '~entities/todo/TodoItem'

import { Accordion } from '~shared/ui'

export interface Todos {
    id: number;
    text: string;
    completed: boolean;
    children: Todos[];
}

export const TodoList: FC = () => {
    const [todos, setTodos] = useState<Todos[]>([
        {
            id: 1,
            text: "Task 1",
            completed: false,
            children: [
                {
                    id: 2,
                    text: "Subtask 1.1",
                    completed: false,
                    children: []
                },
                {
                    id: 3,
                    text: "Subtask 1.2",
                    completed: false,
                    children: [
                        {
                            id: 4,
                            text: "Subsubtask 1.2.1",
                            completed: false,
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: 5,
            text: "Task 2",
            completed: false,
            children: []
        }
    ]);

    return (
        <Accordion type="single" collapsible className="w-full">
            <TodoItem todos={todos} setTodos={setTodos} />
        </Accordion >
    )
}
