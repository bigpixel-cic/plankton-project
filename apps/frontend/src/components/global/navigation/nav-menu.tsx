import Link from 'next/link'

export type NavMenuProps = {
  linkType?: ('href' | 'section' | 'page' | 'post') | null
  label: string
  href?: string | null
  section?: ('/' | '/about' | '/contact' | '/blog' | '/resources') | null
  page?: { heading: string; slug: string } | null
  post?: { title: string; slug: string } | null
  openInNewTab?: boolean | null
  id?: string | null
}

function getTheUrl(item: NavMenuProps) {
  let slug
  switch (item.linkType) {
    case 'href':
      slug = item.href
      break
    case 'section':
      slug = item.section
      break
    case 'page':
      slug = item.page?.slug
      break
    case 'post':
      slug = item.post?.slug
      break
    default:
      slug = '#'
  }
  return slug
}

export function DesktopMenu({ mainNav }: { mainNav: NavMenuProps[] }) {
  if (!mainNav) return null
  return (
    <div className="hidden lg:flex lg:gap-x-12">
      {mainNav.map((item) => (
        <Link
          key={item.id}
          href={getTheUrl(item) ?? '#'}
          className="text-base/6 font-semibold text-teal-100 hover:text-white transition-colors ease-out duration-200"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export function MobileMenu({
  mainNav,
  onClick,
}: {
  mainNav: NavMenuProps[]
  onClick?: () => void
}) {
  if (!mainNav) return null
  return (
    <div className="mt-6 flow-root">
      <div className="-my-6 divide-y divide-slate-500/10 dark:divide-white/10">
        <div className="space-y-2 py-6">
          {mainNav.map((item) => (
            <Link
              key={item.id}
              href={getTheUrl(item) ?? '#'}
              className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-slate-900 hover:bg-teal-50 dark:text-white dark:hover:bg-white/5"
              onClick={onClick}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FooterMenu({ footerNav }: { footerNav: NavMenuProps[] }) {
  if (!footerNav) return null
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 my-4 lg:my-0 justify-center items-center">
      {footerNav.map((item) => (
        <Link
          key={item.id}
          href={getTheUrl(item) ?? '#'}
          className="text-sm font-semibold text-teal-100 hover:text-white transition-colors ease-out duration-200"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}
