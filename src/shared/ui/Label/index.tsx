import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import cn from "clsx"

import cls from './Label.module.scss'

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(cls.label, className)}
        {...props}
    />
))

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
