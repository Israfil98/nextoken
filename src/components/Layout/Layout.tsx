import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useSidebarStore } from '../../stores/sidebarStore';
import { useThemeStore } from '../../stores/themeStore';
import styles from './Layout.module.scss';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

const Layout = () => {
  const theme = useThemeStore((state) => state.theme);
  const isExpanded = useSidebarStore((state) => state.isExpanded);

  // Sync theme to <html> on mount and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div
        className={`${styles.main} ${isExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed}`}
      >
        <TopBar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
