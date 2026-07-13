import RichText from '@/components/global/richtext'
import ResourceList from '@/components/resources/resource-list'
import { getResourcePage } from '../../queries'

export default async function Resources() {
  const data = await getResourcePage()

  if (!data) {
    return (
      <div className="flex flex-col gap-y-6 sm:gap-y-9 md:gap-y-12">
        <h1 className="heading">Resources</h1>
        <p className="subheading">This is the resources page of the website.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-6 sm:gap-y-9 md:gap-y-12">
      <h1 className="heading">{data.heading}</h1>
      <p className="subheading">{data.subheading}</p>
      {data.introText && <RichText data={data.introText} enableProse white />}
      <ResourceList />
    </div>
  )
}
