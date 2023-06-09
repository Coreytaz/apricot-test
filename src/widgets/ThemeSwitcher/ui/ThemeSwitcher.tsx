import cn from 'clsx'

import { Theme, useTheme } from '~app/providers/ThemeProvider';
import { Moon, Son } from '~shared/assets';
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
            {theme === Theme.DARK ? <Son /> : <Moon />}
        </Button>
    );
};
