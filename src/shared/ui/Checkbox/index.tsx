import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import cn from "clsx"

import { ReactComponent as Check } from "~shared/assets/icons/check.svg"

import clx from './Checkbox.module.scss'

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(clx.Root,
            className
        )}
        {...props}
    >
        <CheckboxPrimitive.Indicator
            className={cn(clx.Indicator)}
        >
            <Check className={clx.Check} />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
