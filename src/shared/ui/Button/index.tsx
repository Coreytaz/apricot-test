import { ButtonHTMLAttributes, FC } from 'react';
import cn from 'clsx'

import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: 'default' | 'clear';
    size?: 'default' | 'sm' | 'lg'
}

export const Button: FC<ButtonProps>
    = ({
        className,
        children,
        size = 'default',
        theme = 'default',
        ...otherProps
    }) => {

        return (
            <button
                type="button"
                className={cn(cls.Button, [cls[`${theme}_theme`]], [cls[`${size}_size`]], className)}
                {...otherProps}
            >
                {children}
            </button>
        );
    };
