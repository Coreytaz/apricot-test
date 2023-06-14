import * as React from "react"
import cn from "clsx"

import clx from './Checkbox.module.scss'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Checkbox: React.FC<CheckboxProps> = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
    return (
        <input type="checkbox" ref={ref} {...props} className={cn(clx.Root, className)} />
    );
});
