import cn from 'clsx'
import './styles/index.scss'

import { Sidebar } from '~widgets/Sidebar';

import { AppRouter } from './providers/router';
import { useTheme } from './providers/ThemeProvider';
import { withProviders } from './providers';

export interface AppProps { }

function App() {
  const { theme } = useTheme();

  return (
    <div className={cn('app', theme)}>
      <div className="content-page">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  )
}

const ProvidedApp: React.FC<AppProps> = withProviders(App)

export { ProvidedApp as App }
