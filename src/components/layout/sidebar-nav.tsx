'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookUser,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  CreditCard,
  ClipboardCheck,
  Building,
  Users,
} from 'lucide-react';
import { useUserClaims } from '@/hooks/use-user-claims';

import { SchoolVerseLogo } from '@/components/icons';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '../ui/skeleton';

const masterNav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/schools', label: 'Schools', icon: Building },
  { href: '/dashboard/subscriptions', label: 'Subscriptions', icon: CreditCard },
];

const adminNav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/students', label: 'Students', icon: GraduationCap },
  { href: '/dashboard/teachers', label: 'Teachers', icon: BookUser },
  { href: '/dashboard/results', label: 'Results', icon: ClipboardCheck },
  { href: '/dashboard/payments', label: 'Payments', icon: CreditCard },
  { href: '/dashboard/notices', label: 'Notices', icon: Megaphone },
];

const teacherNav = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/my-students', label: 'My Students', icon: Users },
    { href: '/dashboard/result-entry', label: 'Result Entry', icon: ClipboardCheck },
    { href: '/dashboard/notices', label: 'Notices', icon: Megaphone },
];

const studentNav = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/my-result', label: 'My Result', icon: ClipboardCheck },
    { href: '/dashboard/my-payments', label: 'My Payments', icon: CreditCard },
    { href: '/dashboard/notices', label: 'Notices', icon: Megaphone },
];

const navItemsByRole = {
    master: masterNav,
    admin: adminNav,
    teacher: teacherNav,
    student: studentNav
}


export function SidebarNav() {
  const pathname = usePathname();
  const { claims, isLoading } = useUserClaims();
  const role = claims?.role;
  const navItems = role ? navItemsByRole[role] : [];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <SchoolVerseLogo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight font-headline text-primary-foreground group-data-[collapsible=icon]:hidden">
            RHOM School Management
          </span>
        </div>
      </SidebarHeader>
      <Separator className="bg-sidebar-border" />
      <SidebarContent>
        <SidebarMenu>
          {isLoading && (
             <div className='p-2 flex flex-col gap-1'>
                {Array.from({ length: 5 }).map((_, i) => <SidebarMenuSkeleton key={i} showIcon />)}
             </div>
          )}
          {!isLoading && navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href) && (item.href.length > 10 || pathname === '/dashboard')}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator className="my-2 bg-sidebar-border" />
      <SidebarFooter>
        <div className="text-xs text-sidebar-foreground/50 px-2 group-data-[collapsible=icon]:hidden">
            <p>&copy; {new Date().getFullYear()} RHOM School Management</p>
            {isLoading ? 
                <Skeleton className="h-4 w-12 mt-1" /> :
                (role && <p>Role: <span className="capitalize font-medium text-sidebar-foreground/80">{role}</span></p>)
            }
        </div>
      </SidebarFooter>
    </>
  );
}
