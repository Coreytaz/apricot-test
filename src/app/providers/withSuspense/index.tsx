import { Suspense } from 'react';

import { AppProps } from '~app/App';

export const withSuspense = (component: any) => (props: AppProps) => {
    return <Suspense fallback={<div>Загрузка...</div>}>{component(props)}</Suspense>;
}
