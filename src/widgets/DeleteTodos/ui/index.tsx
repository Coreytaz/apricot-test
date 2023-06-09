import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { todoStore } from '~entities/todo'
import { Trash } from '~shared/assets'
import { Button } from '~shared/ui'

export const DeleteTodos: FC = observer(() => {
    return (
        <Button onClick={() => todoStore.deleteTodos()} theme='clear'><Trash /></Button>
    )
})
