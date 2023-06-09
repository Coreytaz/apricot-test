import { FC } from 'react'

import { Todos } from '~entities/TodoList'

import cls from './styles.module.scss'

export const CardTodo: FC<Todos> = ({ id, text, description }) => {
    return (
        <div key={id} className={cls.card}>
            <div><span>ID:</span><p>{id}</p></div>
            <div style={{ textAlign: 'center' }}>Название задания <p>{text}</p></div>
            <div style={{ textAlign: 'center' }}>Описания задания <p>{description?.length! > 0 ? description : 'Отсутствует'}</p></div>
        </div>
    )
}
