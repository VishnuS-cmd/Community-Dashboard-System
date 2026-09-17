import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  strokeWidth?: number;
}

function BaseSvg({
  size = 16,
  strokeWidth = 2,
  className = '',
  children,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconDashboard(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </BaseSvg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </BaseSvg>
  );
}

export function IconUserHeart(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 14.2c1.4-1.4 2.8-.9 2.8.6 0 1.5-2.8 3.2-2.8 3.2s-2.8-1.7-2.8-3.2c0-1.5 1.4-2 2.8-.6z" />
    </BaseSvg>
  );
}

export function IconUserCheck(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </BaseSvg>
  );
}

export function IconHeartHandshake(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9" />
      <path d="m14 13 1.5 1.5" />
    </BaseSvg>
  );
}

export function IconHandshake(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L13 12" />
      <path d="m18 13 3.3-3.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L14 9" />
      <path d="M2 14v3a2 2 0 0 0 2 2h2.5l5.5-5.5" />
      <path d="M22 10V7a2 2 0 0 0-2-2h-2.5L12 10.5" />
      <path d="m6 11 4-4" />
    </BaseSvg>
  );
}

export function IconClipboardList(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </BaseSvg>
  );
}

export function IconMegaphone(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="m3 11 18-5v12L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </BaseSvg>
  );
}

export function IconZap(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </BaseSvg>
  );
}

export function IconCoins(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.7 13.3.6.7" />
    </BaseSvg>
  );
}

export function IconWrench(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </BaseSvg>
  );
}

export function IconBarChart(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="14" />
    </BaseSvg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
    </BaseSvg>
  );
}

export function IconTrendingUp(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </BaseSvg>
  );
}

export function IconTrendingDown(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </BaseSvg>
  );
}

export function IconFiles(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
      <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" />
      <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h11" />
    </BaseSvg>
  );
}

export function IconFlask(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
      <path d="M8.5 2h7" />
      <path d="M7 16h10" />
    </BaseSvg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </BaseSvg>
  );
}

export function IconAlertTriangle(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </BaseSvg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <polyline points="20 6 9 17 4 12" />
    </BaseSvg>
  );
}

export function IconCheckCircle(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </BaseSvg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </BaseSvg>
  );
}

export function IconLogOut(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </BaseSvg>
  );
}

export function IconPencil(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </BaseSvg>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </BaseSvg>
  );
}

export function IconInbox(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </BaseSvg>
  );
}

export function IconBan(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" x2="19.07" y1="4.93" y2="19.07" />
    </BaseSvg>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </BaseSvg>
  );
}
