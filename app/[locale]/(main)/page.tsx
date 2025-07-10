import { getCategories } from './_actions/get-categories'
import HomePage from './page.client'

export default async function Home() {
  const NavCategories = await getCategories()

  return <HomePage NavCategories={NavCategories} />
}
