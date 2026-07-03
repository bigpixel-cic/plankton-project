'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogPanel } from '@headlessui/react';

import { DesktopMenu, MobileMenu } from '@/components/global/navigation/nav-menu';
import { Menu, X } from 'lucide-react';

import type { NavigationQueryResult } from '@/sanity.types';

type NavBarProps = { mainNav: NavigationQueryResult | null };

export default function NavBar({ mainNav }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-teal-600 dark:bg-teal-950 shadow-lg">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">The Plankton Project</span>
            <Image
              className="h-8 w-auto"
              src="/brand/menu-icon.svg"
              alt=""
              height={32}
              width={32}
            />
          </Link>
        </div>
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <DesktopMenu mainNav={mainNav} />
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* <Link
            href="#"
            className="text-sm/6 font-semibold text-teal-100 hover:text-white transition-colors ease-out duration-200"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link> */}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10 dark:bg-slate-900 dark:sm:ring-slate-100/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">The Plankton Project</span>
              <Image
                className="h-8 w-auto"
                src="/brand/menu-icon.svg"
                alt=""
                height={32}
                width={32}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-slate-700 dark:text-slate-300"
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <MobileMenu mainNav={mainNav} onClick={() => setMobileMenuOpen(false)} />
          {/* <div className="py-6">
            <Link
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-slate-900 hover:bg-teal-50 dark:text-white dark:hover:bg-white/5"
            >
              Log in
            </Link>
          </div> */}
        </DialogPanel>
      </Dialog>
    </header>
  );
}
