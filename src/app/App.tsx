import './styles/index.scss'

import { Sidebar } from '~widgets/Sidebar';

import { AppRouter } from './providers/router';
import { withProviders } from './providers';

export interface AppProps { }

function App() {

  return (
    <div className="app">
      <div className="content-page">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  )
}

const ProvidedApp: React.FC<AppProps> = withProviders(App)

export { ProvidedApp as App }
