import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { AlbumIcon, BookOpen, CalendarPlus2Icon, Folder, LayoutGrid, MessageCircle, QuoteIcon, ServerOffIcon, UserCheckIcon, WavesLadder } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Services',
        href: '/admin/services',
        icon: ServerOffIcon,
    },
    {
        title: 'Members',
        href: '/admin/teams',
        icon: UserCheckIcon,
    },
    {
        title: 'Testimonials',
        href: '/admin/testimonials',
        icon: CalendarPlus2Icon,
    },
    {
        title: 'Faqs',
        href: '/admin/faqs',
        icon: QuoteIcon,
    },
    {
        title: 'Stats',
        href: '/admin/stats',
        icon: WavesLadder,
    },
    {
        title: 'Slides',
        href: '/admin/slides',
        icon: AlbumIcon,
    },
    {
        title: 'Messages',
        href: '/admin/contacts',
        icon: MessageCircle,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/thomas6441code/Denancy-0.02',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
