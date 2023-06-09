import { useState } from 'react';
import cn from 'clsx'
import { observer } from 'mobx-react-lite';

import { ThemeSwitcher } from '~widgets/ThemeSwitcher';
import { Button } from '~shared/ui';
import { Chevron } from '~shared/assets';
import { DeleteTodos } from '~widgets/DeleteTodos';
import { AddTodos } from '~widgets/AddTodos';
import { SearchTodo } from '~widgets/SearchTodo';
import { TodoList } from '~entities/TodoList';

import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = observer(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div
            className={cn(cls.Sidebar, { [cls.collapsed]: collapsed }, className)}
        >
            <Button onClick={onToggle} className={cls.toggle} theme='clear'><Chevron className={cn({ [cls.toggle_arrow]: collapsed })} /></Button>
            <div className={cn(cls.wrapper, { [cls.hide]: collapsed })}>
                <div className={cls.navTodo}>
                    <DeleteTodos />
                    <AddTodos />
                    <SearchTodo />
                </div>
                <TodoList />
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
            </div>
        </div>
    );
});
