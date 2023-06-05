import compose from 'compose-function';

import { withSuspense } from './withSuspense';
import { withRouter } from './withRouter';

export const withProviders = compose<any>(
    withSuspense,
    withRouter,
);
