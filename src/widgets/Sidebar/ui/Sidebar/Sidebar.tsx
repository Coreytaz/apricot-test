import { useState } from 'react';
import cn from 'clsx'

import { ThemeSwitcher } from '~widgets/ThemeSwitcher';

import { ReactComponent as Chevron } from '~shared/assets/icons/chevron-left.svg'

import { Button } from '~shared/ui';

import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div
            className={cn(cls.Sidebar, { [cls.collapsed]: collapsed }, className)}
        >
            <Button onClick={onToggle} className={cls.toggle} theme='clear'><Chevron className={cn({ [cls.toggle_arrow]: collapsed })} /></Button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
            </div>
        </div>
    );
};
