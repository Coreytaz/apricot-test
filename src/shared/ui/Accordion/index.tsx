import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import cn from 'clsx'

import { ReactComponent as ChevronDown } from "~shared/assets/icons/ChevronDown.svg"

import cls from './Acordion.module.scss';

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn(cls.AccordionItem, className)}
        {...props}
    />
))

AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className={cls.flex}>
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                cls.AccordionTrigger,
                className
            )}
            {...props}
        >
            <ChevronDown className={cls.ChevronDown} />
            {children}
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
))

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn(
            cls.AccordionContent,
            className
        )}
        {...props}
    >
        <div className={cls.AccordionContentChildren}>{children}</div>
    </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
