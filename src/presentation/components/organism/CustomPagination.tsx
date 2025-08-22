import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from '../ui/pagination'

type CustomPaginationProps = {
  currentPage: number
  totalPages: number
  changePage: (page: number) => void
} & React.ComponentProps<'nav'>

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  changePage,
  ...props
}) => {
  const renderEllipsis = (key: string) => (
    <PaginationItem key={key} data-testid="pagination-ellipsis">
      <PaginationEllipsis />
    </PaginationItem>
  )

  const renderPage = (page: number) => {
    const isCurrent = page === currentPage
    return (
      <PaginationItem
        key={page}
        data-testid={`page-${page}`}
        data-active={isCurrent || undefined}
        data-first={page === 1 || undefined}
        data-last={page === totalPages || undefined}
        onClick={() => changePage(page)}
      >
        <PaginationLink
          href="#"
          isActive={isCurrent}
          className={isCurrent ? 'bg-stone-300 text-white' : undefined}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    )
  }

  const getPages = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      pages.push(totalPages)
    }

    return pages
  }

  return totalPages <= 1 ? null : (
    <Pagination data-testid="pagination" {...props}>
      <PaginationContent data-testid="total-pages">
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              data-testid="previous-page-toogle"
              onClick={() => changePage(currentPage - 1)}
            />
          </PaginationItem>
        )}

        {getPages().map((page, index) =>
          page === 'ellipsis'
            ? renderEllipsis(`ellipsis-${index}`)
            : renderPage(page),
        )}

        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              data-testid="next-page-toogle"
              onClick={() => changePage(currentPage + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
