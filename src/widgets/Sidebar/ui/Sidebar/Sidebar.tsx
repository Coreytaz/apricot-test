import { useState } from 'react';
import cn from 'clsx'
import { observer } from 'mobx-react-lite';

import { ThemeSwitcher } from '~widgets/ThemeSwitcher';
import { ReactComponent as Chevron } from '~shared/assets/icons/chevron-left.svg'
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '~shared/ui';
import { TodoList, todoStore } from '~entities/todo';

import useInput from '~shared/hook/useInput';

import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = observer(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        bindings: bindingsTask,
    } = useInput('');

    const {
        bindings: bindingsSelectTask
    } = useInput('');

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const onAddTodo = () => {
        console.log(bindingsSelectTask.value, bindingsTask.value);

        todoStore.addTodo({
            id: Number(new Date()),
            text: bindingsTask.value,
            completed: false,
            children: []
        }, Number(bindingsSelectTask.value) || null)
    }

    return (
        <div
            className={cn(cls.Sidebar, { [cls.collapsed]: collapsed }, className)}
        >
            <Button onClick={onToggle} className={cls.toggle} theme='clear'><Chevron className={cn({ [cls.toggle_arrow]: collapsed })} /></Button>
            <Button onClick={() => todoStore.deleteTodos()} theme='default'>Удалить</Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button theme='default'>Добавить задания</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавить задания</DialogTitle>
                        <DialogDescription>
                            Внесите изменения в свои задания здесь. Нажмите Создать, когда закончите.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Input type="text" placeholder="Имя задания" {...bindingsTask} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Select onValueChange={bindingsSelectTask.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите задания" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Задания</SelectLabel>
                                        {
                                            todoStore.getSelectTodo.map((todo) => (
                                                <SelectItem key={todo.id} value={todo.id.toString()}>{todo.text}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => onAddTodo()}>Создать</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className={cn(cls.wrapper, { [cls.hide]: collapsed })}>
                <TodoList />
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
            </div>
        </div>
    );
});
