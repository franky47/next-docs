import { GithubIcon } from 'lucide-react';
import type { PageTree } from 'next-docs-zeta/server';
import { type ReactNode } from 'react';
import type { SidebarProps } from '@/components/sidebar';
import type { NavItemProps, NavLinkProps } from './nav';
import { replaceOrDefault } from './utils/replace-or-default';
import { setPageTree } from './utils/global';

const { Nav, LayoutContextProvider, Sidebar } = await import('./layout.client');

export interface DocsLayoutProps {
  tree: PageTree;

  /**
   * Replace or disable navbar
   */
  nav?: Partial<{
    enabled: boolean;
    component: ReactNode;
    title: ReactNode;
    /**
     * Redirect url of title
     * @defaultValue '/'
     */
    url: string;
    items: NavItemProps[];
    /**
     * Github url displayed on the navbar
     */
    githubUrl: string;
  }>;

  sidebar?: Partial<
    SidebarProps & {
      enabled: boolean;
      component: ReactNode;
      collapsible: boolean;

      /**
       * Open folders by default if their level is lower or equal to a specific level
       * (Starting from 1)
       *
       * @defaultValue 1
       */
      defaultOpenLevel: number;
    }
  >;

  children: ReactNode;
}

export function DocsLayout({
  nav = {},
  sidebar = {},
  tree,
  children,
}: DocsLayoutProps): JSX.Element {
  setPageTree(tree);
  const links: NavLinkProps[] = [];

  if (nav.githubUrl)
    links.push({
      href: nav.githubUrl,
      label: 'Github',
      icon: <GithubIcon />,
      external: true,
    });

  return (
    <LayoutContextProvider
      value={{
        tree,
        sidebarDefaultOpenLevel: sidebar.defaultOpenLevel ?? 1,
      }}
    >
      {replaceOrDefault(
        nav,
        <Nav
          title={nav.title}
          url={nav.url}
          links={links}
          items={nav.items}
          enableSidebar={sidebar.enabled ?? true}
          collapsibleSidebar={sidebar.collapsible ?? true}
        />,
      )}
      <div className="container flex flex-row gap-6 xl:gap-12">
        {replaceOrDefault(
          sidebar,
          <Sidebar banner={sidebar.banner} footer={sidebar.footer} />,
        )}

        {children}
      </div>
    </LayoutContextProvider>
  );
}
