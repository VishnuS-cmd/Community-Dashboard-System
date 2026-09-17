import { type CSSProperties, type PropsWithChildren } from 'react';
import { themeConfig } from './theme.config';

export function ThemeProvider({ children }: PropsWithChildren) {
  const style = {
    '--theme-primary': themeConfig.colors.primary,
    '--theme-accent': themeConfig.colors.accent,
    '--theme-background': themeConfig.colors.background,
    '--theme-surface': themeConfig.colors.surface,
    '--theme-muted': themeConfig.colors.muted,
    '--theme-text': themeConfig.colors.text,
    '--theme-sidebar': themeConfig.colors.sidebar || themeConfig.colors.primary,
    '--theme-border': themeConfig.colors.border || themeConfig.colors.muted,
    '--theme-chart-1': themeConfig.colors.chart1 || themeConfig.colors.primary,
    '--theme-chart-2': themeConfig.colors.chart2 || themeConfig.colors.accent,
    '--theme-chart-3': themeConfig.colors.chart3 || themeConfig.colors.muted,
    '--theme-radius': themeConfig.radius,
    '--theme-density': themeConfig.density === 'compact' ? '0.75rem' : themeConfig.density === 'spacious' ? '1.5rem' : '1rem',
    '--theme-shadow': themeConfig.cardStyle === 'elevated' ? '0 16px 40px rgba(15, 23, 42, 0.12)' : 'none'
  } as CSSProperties;

  return (
    <div className={`theme-root theme-${themeConfig.style} density-${themeConfig.density} sidebar-${themeConfig.sidebarVariant} cards-${themeConfig.cardStyle}`} style={style}>
      {children}
    </div>
  );
}
