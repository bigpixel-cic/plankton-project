import Link from 'next/link';
import { FooterNavigationQueryResult, NavigationQueryResult } from '@/sanity.types';

type NavMenuProps = {
  mainNav: NavigationQueryResult | null;
  onClick?: () => void;
};

type FooterMenuProps = {
  footerNav: FooterNavigationQueryResult | null;
};

function linkHref(item: NonNullable<NavigationQueryResult | FooterNavigationQueryResult>[number]) {
  if (item.linkType === 'post' && item.post?.slug) {
    return `/blog/${item.post.slug}`;
  }
  if (item.linkType === 'page' && item.page?.slug) {
    return `/${item.page.slug}`;
  }
  return item.href || '#';
}

export function DesktopMenu({ mainNav }: NavMenuProps) {
  if (!mainNav) return null;
  return (
    <div className="hidden lg:flex lg:gap-x-12">
      {mainNav.map((item) => (
        <Link
          key={item._key}
          href={linkHref(item)}
          className="text-base/6 font-semibold text-teal-100 hover:text-white transition-colors ease-out duration-200"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function MobileMenu({ mainNav, onClick }: NavMenuProps) {
  if (!mainNav) return null;
  return (
    <div className="mt-6 flow-root">
      <div className="-my-6 divide-y divide-slate-500/10 dark:divide-white/10">
        <div className="space-y-2 py-6">
          {mainNav.map((item) => (
            <Link
              key={item._key}
              href={linkHref(item)}
              className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-slate-900 hover:bg-teal-50 dark:text-white dark:hover:bg-white/5"
              onClick={onClick}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FooterMenu({ footerNav }: FooterMenuProps) {
  if (!footerNav) return null;
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 my-4 lg:my-0 justify-center items-center">
      {footerNav.map((item) => (
        <Link
          key={item._key}
          href={linkHref(item)}
          className="text-sm font-semibold text-teal-100 hover:text-white transition-colors ease-out duration-200"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
