import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { NavLink } from 'react-router';
import { navItems } from '../../../data/navigation';
import { useSidebarStore } from '../../../stores/sidebarStore';
import { useThemeStore } from '../../../stores/themeStore';
import { Logo } from '../../common';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const { isExpanded, isMobileOpen, toggleExpanded, closeMobile } =
    useSidebarStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <>
      {/* Mobile backdrop — covers the page when sidebar is open on mobile */}
      {isMobileOpen && (
        <div
          className={styles.backdrop}
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed} ${isMobileOpen ? styles.mobileOpen : ''}`}
      >
        {/* Logo area */}
        <div className={styles.logo}>
          <Logo size={32} className={styles.logoIcon} />
          {isExpanded && <span className={styles.logoText}>NexToken</span>}
        </div>

        {/* Navigation links */}
        <nav className={styles.nav}>
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              onClick={closeMobile}
            >
              <Icon size={20} className={styles.navIcon} />
              {isExpanded && <span className={styles.navLabel}>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Theme toggle */}
        <button
          className={styles.themeBtn}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          {isExpanded && (
            <span className={styles.navLabel}>
              {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </span>
          )}
        </button>

        {/* Collapse toggle — desktop only */}
        <button
          className={styles.collapseBtn}
          onClick={toggleExpanded}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
