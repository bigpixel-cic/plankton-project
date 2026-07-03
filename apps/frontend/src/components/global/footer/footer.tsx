import { dataAttr } from '@/sanity/utils';

import Image from 'next/image';
import { SmallSocials } from '@/components/global/socials';
import { FooterMenu } from '@/components/global/navigation/nav-menu';

import { FooterQueryResult, FooterNavigationQueryResult } from '@/sanity.types';

type FooterProps = { footerData: FooterQueryResult | null };
type FooterNavProps = { footerNav: FooterNavigationQueryResult | null };

export default function Footer({ footerData, footerNav }: FooterProps & FooterNavProps) {
  if (!footerData) return null;
  return (
    <footer className="w-screen bg-sky-900 dark:bg-sky-950 border-t border-sky-800 dark:border-sky-900">
      <div className="w-full max-w-7xl px-6 mx-auto pt-16 pb-8 text-white">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between">
          <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-2">
            <Image className="size-9" src="/brand/menu-icon.svg" alt="" width={36} height={36} />
            <p
              data-sanity={dataAttr({
                id: footerData._id,
                type: 'footer',
                path: 'organisationName',
              }).toString()}
              className="font-headline font-extrabold"
            >
              {footerData.organisationName}
            </p>
            <p
              data-sanity={dataAttr({
                id: footerData._id,
                type: 'footer',
                path: 'orgDetails',
              }).toString()}
              className="text-xs text-center lg:text-left"
            >
              {footerData.orgDetails}
            </p>
            <SmallSocials
              data-sanity={dataAttr({
                id: footerData._id,
                type: 'footer',
                path: 'socialMedia',
              }).toString()}
              socialMedia={footerData.socialMedia}
            />
          </div>
          <FooterMenu
            footerNav={footerNav}
            data-sanity={dataAttr({
              id: footerData._id,
              type: 'footer',
              path: 'navigation',
            }).toString()}
          />
        </div>
        <div className="my-8 w-full">
          <p className="text-sm text-teal-100 text-center lg:text-left">
            &copy; {new Date().getFullYear()} {footerData.organisationName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
