import React from 'react';
import type { MenuItem } from './types';

// Icon Components
export const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);
export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
);
export const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
);
export const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
);
export const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>
);
export const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
export const PackageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /><path d="M12 22V12" /><polyline points="3.29 7 12 12 20.71 7" /><path d="m7.5 4.27 9 5.15" /></svg>
);
export const WavesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /></svg>
);
export const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
);
export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
export const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
);
export const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6" /></svg>
);
export const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6" /></svg>
);
export const ArrowDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
);
export const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
);
export const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);
export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
export const TruckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 17h4V5H2v12h3"></path><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h6z"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
);
export const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
);
export const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
);
export const RefreshCwIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 2v6h6"></path><path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path><path d="M21 22v-6h-6"></path><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path></svg>
);
export const BoxIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
);
export const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);
export const ShuffleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="16 16 21 16 21 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
);
export const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
export const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
export const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
);
export const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
export const TagIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
);
export const ScaleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 16.5a2.5 2.5 0 1 1-5 0"></path><path d="M22 6a4 4 0 0 0-4-4H6A4 4 0 0 0 2 6"></path><path d="M6 6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4"></path><path d="M6 6v1.5a2.5 2.5 0 0 0 5 0V6"></path><path d="M2 6h20"></path><path d="M4 22h16"></path><path d="M12 6V2"></path></svg>
);
export const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
export const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
export const MapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
);
export const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);
export const LinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
);
export const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);
export const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);
export const ListIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
);
export const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);
export const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
export const BarcodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 6h2v12H2zm4 0h1v12H6zm2 0h2v12H8zm3 0h1v12h-1zm2 0h2v12h-2zm3 0h1v12h-1zm2 0h2v12h-2z"></path></svg>
);
export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);
export const PrinterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
);
export const LanguagesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></svg>
);
export const ArrowUpCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>
);
export const UploadCloudIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 16l-4-4-4 4"></path><path d="M12 12v9"></path><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><path d="M16 16l-4-4-4 4"></path></svg>
);
export const ActivityIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);
export const AlertTriangleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
export const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);
export const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
export const MoreHorizontalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
);
export const SaveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
);
export const Trash2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);
export const ArchiveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
);
export const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"></path></svg>
);
export const ChevronsLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m11 17-5-5 5-5"></path><path d="m18 17-5-5 5-5"></path></svg>
);
export const ChevronsRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path></svg>
);
export const HelpCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
export const MoreVerticalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
);

export const PencilIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
);
export const FileSpreadsheetIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M16 13h-3v4"></path>
        <path d="M13 17h3"></path>
        <path d="M8 13h3v4"></path>
        <path d="M8 17h3"></path>
    </svg>
);
export const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);


const iconStyle = { width: 16, height: 16 };

// Menu Items Data
export const MENU_ITEMS: MenuItem[] = [
  {
    key: 'wms',
    label: 'Sistema de gestión de almacenes (WMS)',
    icon: <PackageIcon style={iconStyle} />,
    subItems: [
      {
        key: 'wms-entrada', label: 'Entrada', icon: <ArrowDownIcon style={iconStyle} />,
        subItems: [
          { key: 'wms-entrada-oc', label: 'Orden de compra', icon: <FileTextIcon style={iconStyle} />, path: '/wms/entrada/oc' },
          { key: 'wms-entrada-detalle-oc', label: 'Detalle OC', icon: <FileTextIcon style={iconStyle} />, path: '/wms/entrada/detalle-oc' },
          { key: 'wms-entrada-asn', label: 'ASN/Recepción', icon: <TruckIcon style={iconStyle} />, path: '/wms/entrada/asn' },
          { key: 'wms-entrada-asn-detalle', label: 'ASN/Detalle de recepción', icon: <TruckIcon style={iconStyle} />, path: '/wms/entrada/asn-detalle' },
          { key: 'wms-entrada-graficos', label: 'Gráficos de entrada', icon: <BarChartIcon style={iconStyle} />, path: '/wms/entrada/graficos' },
          { key: 'wms-entrada-consulta', label: 'Consulta de entrada', icon: <SearchIcon style={iconStyle} />, path: '/wms/entrada/consulta' },
          { key: 'wms-entrada-verificar', label: 'Verificar/cerrar entrada', icon: <CheckCircleIcon style={iconStyle} />, path: '/wms/entrada/verificar' },
          { key: 'wms-entrada-inversion', label: 'Inversión de recepción', icon: <RefreshCwIcon style={iconStyle} />, path: '/wms/entrada/inversion' },
          { key: 'wms-entrada-cc', label: 'Entrada CC', icon: <SettingsIcon style={iconStyle} />, path: '/wms/entrada/cc' },
          { key: 'wms-entrada-reglas-cc', label: 'Reglas de muestra CC entrada', icon: <SettingsIcon style={iconStyle} />, path: '/wms/entrada/reglas-cc' },
        ]
      },
      {
        key: 'wms-salida', label: 'Salida', icon: <ArrowUpIcon style={iconStyle} />,
        subItems: [
          { key: 'wms-salida-orden', label: 'Orden de expedición', icon: <FileTextIcon style={iconStyle} />, path: '/wms/salida/orden' },
          { key: 'wms-salida-detalles-exp', label: 'Detalles de la expedición', icon: <BoxIcon style={iconStyle} />, path: '/wms/salida/detalles-exp' },
          { key: 'wms-salida-detalles-prep', label: 'Detalles de la preparación', icon: <BoxIcon style={iconStyle} />, path: '/wms/salida/detalles-prep' },
          { key: 'wms-salida-asignacion', label: 'Asignación por demanda', icon: <TargetIcon style={iconStyle} />, path: '/wms/salida/asignacion' },
          { key: 'wms-salida-graficos', label: 'Gráficos de salida', icon: <BarChartIcon style={iconStyle} />, path: '/wms/salida/graficos' },
          { key: 'wms-salida-transferencia', label: 'Transferencia de instalación', icon: <ShuffleIcon style={iconStyle} />, path: '/wms/salida/transferencia' },
          { key: 'wms-salida-detalles-cont', label: 'Detalles del contenedor', icon: <BoxIcon style={iconStyle} />, path: '/wms/salida/detalles-cont' },
          { key: 'wms-salida-muelles', label: 'Asignaciones de muelles', icon: <MapPinIcon style={iconStyle} />, path: '/wms/salida/muelles' },
          { key: 'wms-salida-carga', label: 'Administración de carga', icon: <PackageIcon style={iconStyle} />, path: '/wms/salida/carga' },
          { key: 'wms-salida-desasignar', label: 'Desasignar', icon: <XIcon style={iconStyle} />, path: '/wms/salida/desasignar' },
          { key: 'wms-salida-control-calidad', label: 'Paquete/Control de Calidad', icon: <ShieldCheckIcon style={iconStyle} />, path: '/wms/salida/control-calidad' },
          { key: 'wms-salida-control', label: 'Control de salida', icon: <ShieldIcon style={iconStyle} />, path: '/wms/salida/control' },
          { key: 'wms-salida-consolidacion', label: 'Consolidación', icon: <BoxIcon style={iconStyle} />, path: '/wms/salida/consolidacion' },
          { key: 'wms-salida-exp-masiva', label: 'Expedición masiva', icon: <TruckIcon style={iconStyle} />, path: '/wms/salida/exp-masiva' },
          { key: 'wms-salida-rfid', label: 'Etiquetas RFID', icon: <TagIcon style={iconStyle} />, path: '/wms/salida/rfid' },
        ]
      },
      {
        key: 'wms-ejecucion', label: 'Ejecución', icon: <PlayIcon style={iconStyle} />,
        subItems: [
          { key: 'wms-ejecucion-existencias', label: 'Existencias', icon: <PackageIcon style={iconStyle} />, path: '/wms/ejecucion/existencias' },
          { key: 'wms-ejecucion-productividad', label: 'Productividad/Mano de obra', icon: <UsersIcon style={iconStyle} />, path: '/wms/ejecucion/productividad' },
          { key: 'wms-ejecucion-inventario', label: 'Inventario rotativo', icon: <RefreshCwIcon style={iconStyle} />, path: '/wms/ejecucion/inventario' },
          { key: 'wms-ejecucion-palets', label: 'Intercambio de palets', icon: <RefreshCwIcon style={iconStyle} />, path: '/wms/ejecucion/palets' },
          { key: 'wms-ejecucion-reabastecimiento', label: 'Reabastecimiento', icon: <RefreshCwIcon style={iconStyle} />, path: '/wms/ejecucion/reabastecimiento' },
          { key: 'wms-ejecucion-peso', label: 'Ajustes de peso', icon: <ScaleIcon style={iconStyle} />, path: '/wms/ejecucion/peso' },
          { key: 'wms-ejecucion-seguimiento', label: 'Opciones de seguimiento', icon: <EyeIcon style={iconStyle} />, path: '/wms/ejecucion/seguimiento' },
          { key: 'wms-ejecucion-graficos', label: 'Gráficos de ejecución', icon: <BarChartIcon style={iconStyle} />, path: '/wms/ejecucion/graficos' },
          { key: 'wms-ejecucion-mensajeria', label: 'Mensajería', icon: <MessageSquareIcon style={iconStyle} />, path: '/wms/ejecucion/mensajeria' },
          { key: 'wms-ejecucion-visor', label: 'Visor de trabajo visual', icon: <EyeIcon style={iconStyle} />, path: '/wms/ejecucion/visor' },
        ]
      },
      {
        key: 'wms-configuracion', label: 'Configuración', icon: <SettingsIcon style={iconStyle} />,
        subItems: [
            { key: 'wms-config-articulo', label: 'Artículo', icon: <PackageIcon style={iconStyle} />, path: '/wms/config/articulo' },
            { key: 'wms-config-paquete', label: 'Paquete', icon: <BoxIcon style={iconStyle} />, path: '/wms/config/paquete' },
            { key: 'wms-config-envases', label: 'Envases', icon: <BoxIcon style={iconStyle} />, path: '/wms/config/envases' },
            { key: 'wms-config-ubicacion', label: 'Ubicación', icon: <MapPinIcon style={iconStyle} />, path: '/wms/config/ubicacion' },
            { key: 'wms-config-zona', label: 'Zona', icon: <MapIcon style={iconStyle} />, path: '/wms/config/zona' },
            { key: 'wms-config-socio', label: 'Socio comercial', icon: <BriefcaseIcon style={iconStyle} />, path: '/wms/config/socio' },
            { key: 'wms-config-estrategias', label: 'Estrategias', icon: <ShuffleIcon style={iconStyle} />, path: '/wms/config/estrategias' },
            { key: 'wms-config-vincular', label: 'Vincular con ubicación', icon: <LinkIcon style={iconStyle} />, path: '/wms/config/vincular' },
            { key: 'wms-config-codigos', label: 'Códigos', icon: <CodeIcon style={iconStyle} />, path: '/wms/config/codigos' },
            { key: 'wms-config-productividad', label: 'Productividad', icon: <TrendingUpIcon style={iconStyle} />, path: '/wms/config/productividad' },
            { key: 'wms-config-reglas', label: 'Reglas de validación', icon: <CheckCircleIcon style={iconStyle} />, path: '/wms/config/reglas' },
            { key: 'wms-config-articulo-alt', label: 'Artículo alternativo', icon: <BoxIcon style={iconStyle} />, path: '/wms/config/articulo-alt' },
            { key: 'wms-config-materiales', label: 'Lista de materiales', icon: <ListIcon style={iconStyle} />, path: '/wms/config/materiales' },
            { key: 'wms-config-estacion', label: 'Estación clasificación', icon: <FilterIcon style={iconStyle} />, path: '/wms/config/estacion' },
            { key: 'wms-config-produccion', label: 'Producción en zona espera', icon: <ClockIcon style={iconStyle} />, path: '/wms/config/produccion' },
            { key: 'wms-config-formatos', label: 'Formatos de códigos de barras', icon: <BarcodeIcon style={iconStyle} />, path: '/wms/config/formatos' },
        ]
      },
      {
        key: 'wms-admin', label: 'Administración', icon: <SettingsIcon style={iconStyle} />,
        subItems: [
            { key: 'wms-admin-import', label: 'Importaciones', icon: <DownloadIcon style={iconStyle} />, path: '/wms/admin/import' },
            { key: 'wms-admin-config-sys', label: 'Configuración del sistema', icon: <SettingsIcon style={iconStyle} />, path: '/wms/admin/config-sys' },
            { key: 'wms-admin-config-inst', label: 'Administración de instalación', icon: <FileTextIcon style={iconStyle} />, path: '/wms/admin/config-inst' },
            { key: 'wms-admin-opciones', label: 'Opciones de configuración', icon: <SettingsIcon style={iconStyle} />, path: '/wms/admin/opciones' },
            { key: 'wms-admin-impresion', label: 'Administración de impresión', icon: <PrinterIcon style={iconStyle} />, path: '/wms/admin/impresion' },
            { key: 'wms-admin-traduccion', label: 'Traducción de código', icon: <LanguagesIcon style={iconStyle} />, path: '/wms/admin/traduccion' },
            { key: 'wms-admin-personalizacion', label: 'Personalizaciones de usuario', icon: <UserIcon style={iconStyle} />, path: '/wms/admin/personalizacion' },
            { key: 'wms-admin-actividad-in', label: 'Actividad entrante', icon: <ArrowDownIcon style={iconStyle} />, path: '/wms/admin/actividad-in' },
            { key: 'wms-admin-actividad-out', label: 'Actividad en salida', icon: <ArrowUpIcon style={iconStyle} />, path: '/wms/admin/actividad-out' },
            { key: 'wms-admin-carga', label: 'Carga de archivos', icon: <UploadCloudIcon style={iconStyle} />, path: '/wms/admin/carga' },
            { key: 'wms-admin-integracion', label: 'Configuración de integración', icon: <SettingsIcon style={iconStyle} />, path: '/wms/admin/integracion' },
            { key: 'wms-admin-registros', label: 'Registros de integración', icon: <FileTextIcon style={iconStyle} />, path: '/wms/admin/registros' },
            { key: 'wms-admin-alertas', label: 'Alertas de la aplicación', icon: <BellIcon style={iconStyle} />, path: '/wms/admin/alertas' },
            { key: 'wms-admin-estado', label: 'Estado de trabajo secundario', icon: <ActivityIcon style={iconStyle} />, path: '/wms/admin/estado' },
            { key: 'wms-admin-discrepancias', label: 'Discrepancias de stock', icon: <AlertTriangleIcon style={iconStyle} />, path: '/wms/admin/discrepancias' },
        ]
      },
      {
        key: 'wms-crossdock', label: 'Crossdock', icon: <TruckIcon style={iconStyle} />,
        subItems: [
          { key: 'wms-crossdock-reparto', label: 'Reparto de flujo continuo', icon: <ArrowRightIcon style={iconStyle} />, path: '/wms/crossdock/reparto' },
          { key: 'wms-crossdock-informes', label: 'Informes', icon: <FileTextIcon style={iconStyle} />, path: '/wms/crossdock/informes' },
          { key: 'wms-crossdock-oportunidades', label: 'Oportunidades', icon: <ZapIcon style={iconStyle} />, path: '/wms/crossdock/oportunidades' },
          { key: 'wms-crossdock-admin', label: 'Administración', icon: <SettingsIcon style={iconStyle} />, path: '/wms/crossdock/admin' },
        ]
      },
      {
        key: 'wms-orden-trabajo', label: 'Orden de trabajo', icon: <FileTextIcon style={iconStyle} />,
        subItems: [
          { key: 'wms-ot-config', label: 'Configuración', icon: <SettingsIcon style={iconStyle} />, path: '/wms/ot/config' },
          { key: 'wms-ot-admin', label: 'Administración', icon: <SettingsIcon style={iconStyle} />, path: '/wms/ot/admin' },
        ]
      },
      {
        key: 'wms-cita', label: 'Cita', icon: <CalendarIcon style={iconStyle} />,
        subItems: [
          { key: 'wms-cita-main', label: 'Cita', icon: <CalendarIcon style={iconStyle} />, path: '/wms/cita/main' },
          { key: 'wms-cita-lista', label: 'Lista de citas', icon: <ListIcon style={iconStyle} />, path: '/wms/cita/lista' },
          { key: 'wms-cita-remolques', label: 'Remolques', icon: <TruckIcon style={iconStyle} />, path: '/wms/cita/remolques' },
          { key: 'wms-cita-estado', label: 'Estado de remolque', icon: <ActivityIcon style={iconStyle} />, path: '/wms/cita/estado' },
        ]
      },
    ],
  },
  {
    key: 'oleada',
    label: 'Oleada',
    icon: <WavesIcon style={iconStyle} />,
    subItems: [],
  },
  {
    key: 'facturacion',
    label: 'Facturación',
    icon: <FileTextIcon style={iconStyle} />,
    subItems: [],
  },
  {
    key: 'mano-de-obra',
    label: 'Mano de obra',
    icon: <UsersIcon style={iconStyle} />,
    subItems: [],
  },
  {
    key: 'informes',
    label: 'Informes',
    icon: <FileTextIcon style={iconStyle} />,
    subItems: [],
  },
  {
    key: 'programador',
    label: 'Programador',
    icon: <CalendarIcon style={iconStyle} />,
    subItems: [],
  },
];