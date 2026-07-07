import { FooterMenu } from '@/components/global/navigation/nav-menu'
import { SmallSocials } from '@/components/global/socials'
import Image from 'next/image'

import type { Footer as FooterType } from '@/payload-types'

export default function Footer({ data }: { data: FooterType }) {
  if (!data) return null
  return (
    <footer className="w-screen bg-sky-900 dark:bg-sky-950 border-t border-sky-800 dark:border-sky-900">
      <div className="w-full max-w-7xl px-6 mx-auto pt-16 pb-8 text-white">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between">
          <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-2">
            <Image className="size-9" src="/brand/menu-icon.svg" alt="" width={36} height={36} />
            <p className="font-headline font-extrabold">{data.organisationName}</p>
            <p className="text-xs text-center lg:text-left">{data.orgDetails}</p>
            <SmallSocials socialMedia={data.socialMedia} />
          </div>
          <FooterMenu footerNav={data.navigation} />
        </div>
        <div className="my-8 w-full">
          <p className="text-sm text-teal-100 text-center lg:text-left">
            &copy; {new Date().getFullYear()} {data.organisationName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
