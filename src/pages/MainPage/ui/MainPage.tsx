import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { CardTodo } from '~entities/CardTodo';
import { todoStore } from '~entities/todoStore';

import cls from './MainPage.module.scss'

const MainPage: FC = observer(() => {

    return (
        <div className={cls.main}>
            {
                todoStore.getAllCompletedTodo.map((todo) => (
                    <CardTodo key={todo.id} {...todo} />
                ))
            }
        </div >
    );
});

export default MainPage;
