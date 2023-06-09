import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { PlusSquare } from '~shared/assets'
import useInput from '~shared/hook/useInput'
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Textarea } from '~shared/ui'
import { todoStore } from '~entities/todoStore'

import cls from './styles.module.scss'

export const AddTodos: FC = observer(() => {
    const {
        reset: resetTask,
        bindings: bindingsTask,
    } = useInput('', { isEmpty: true });

    const {
        reset: resetDesc,
        bindings: bindingsDesc,
    } = useInput('', {});

    const {
        bindings: bindingsSelectTask
    } = useInput('', {});

    const onAddTodo = () => {
        if (!bindingsTask.inputValid) {
            return
        }

        todoStore.addTodo({
            id: Number(new Date()),
            text: bindingsTask.value,
            description: bindingsDesc.value,
            completed: false,
            children: []
        }, Number(bindingsSelectTask.value) || null)

        resetTask()
        resetDesc()
        bindingsSelectTask.onChange('')
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button theme='clear'><PlusSquare /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить задания</DialogTitle>
                    <DialogDescription>
                        Внесите изменения в свои задания здесь. Нажмите Создать, когда закончите.
                    </DialogDescription>
                </DialogHeader>
                <div className={cls.body}>
                    <div className={cls.item}>
                        <Input type="text" placeholder="Имя задания" {...bindingsTask} />
                        {bindingsTask.isDirty && bindingsTask.empty && (
                            <div className={cls.inputError}>Поле не может быть пустым</div>
                        )}
                    </div>
                    <div className={cls.item}>
                        <Textarea placeholder="Введите свое описание здесь." {...bindingsDesc} />
                    </div>
                    <div className={cls.item}>
                        <Select value={bindingsSelectTask.value} onValueChange={bindingsSelectTask.onChange}>
                            <SelectTrigger>
                                {bindingsSelectTask.value.length > 0 ? <SelectValue /> : 'Выберите задания'}
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
    )
})
