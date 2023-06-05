import { BrowserRouter } from 'react-router-dom';

import { AppProps } from '~app/App';

export const withRouter = (component: any) => (props: AppProps) => {
  return <BrowserRouter>{component(props)}</BrowserRouter>;
};
