import cn from 'clsx'

import { Theme, useTheme } from '~app/providers/ThemeProvider';

import { ReactComponent as DarkIcon } from '~shared/assets/icons/theme-dark.svg'
import { ReactComponent as LightIcon } from '~shared/assets/icons/theme-light.svg'
import { Button } from '~shared/ui';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme='clear'
            className={cn(className)}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <LightIcon /> : <DarkIcon />}
        </Button>
    );
};
