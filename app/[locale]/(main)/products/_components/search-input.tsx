import InputWithIcon from '@/components/input-with-icon'
import { useSearch } from '@/hooks/use-search'
import { Search } from 'lucide-react'

function SearchInput({
  placeholder,
  contentDirection,
}: {
  placeholder: string
  contentDirection: string
}) {
  const { searchTerm, setSearchTerm } = useSearch()

  return (
    <div className="flex-1">
      <InputWithIcon
        name="search"
        classNames="bg-input border-input-border text-secondary placeholder:text-secondary py-3 ps-8"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder={placeholder}
        direction={contentDirection}
        icon={<Search className="size-5" />}
        iconWrapperClasses="top-1/5"
      />
    </div>
  )
}

export default SearchInput
