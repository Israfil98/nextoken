import { Menu, Moon, Sun } from 'lucide-react';
import { useSidebarStore } from '../../../stores/sidebarStore';
import { useThemeStore } from '../../../stores/themeStore';
import styles from './TopBar.module.scss';

const TopBar = () => {
  const openMobile = useSidebarStore((state) => state.openMobile);
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className={styles.topbar}>
      <button
        className={styles.menuBtn}
        onClick={openMobile}
        aria-label="Open navigation menu"
      >
        <Menu size={22} />
      </button>

      <span className={styles.logo}>NexToken</span>

      <button
        className={styles.themeBtn}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </header>
  );
};

export default TopBar;
