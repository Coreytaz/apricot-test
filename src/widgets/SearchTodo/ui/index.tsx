import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { todoStore } from '~entities/todo'
import useInput from '~shared/hook/useInput'
import { Input } from '~shared/ui'

export const SearchTodo: FC = observer(() => {
    const {
        bindings: bindingsSearch,
    } = useInput('', {})

    const onSearchTodo = (search: string) => {
        bindingsSearch.onChange(search)
        todoStore.setSearch(search)
    }

    return (
        <Input value={bindingsSearch.value} onChange={(e) => onSearchTodo(e.target.value)} type="text" placeholder="Поиск..." />
    )
})
