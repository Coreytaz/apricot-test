import * as React from "react"

import cn from "clsx"

import cls from './Textarea.module.scss'

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    cls.Textarea,
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)

Textarea.displayName = "Textarea"

export { Textarea }
