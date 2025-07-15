import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from '../ui/pagination'

import type { ReactNode } from 'react'

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
  let previousPageToogle: undefined | ReactNode
  let nextPageToogle: undefined | ReactNode

  if (currentPage !== 1) {
    previousPageToogle = (
      <PaginationItem>
        <PaginationPrevious data-testid="previous-page-toogle" href="#" />
      </PaginationItem>
    )
  }

  if (currentPage !== totalPages) {
    nextPageToogle = (
      <PaginationItem>
        <PaginationNext href="#" data-testid="next-page-toogle" />
      </PaginationItem>
    )
  }

  const currentPageLinkClassName = (isCurrentPage: boolean) =>
    isCurrentPage ? 'bg-stone-300 text-white' : undefined

  const pageTestID = (isCurrentPage: boolean, id: number) =>
    isCurrentPage ? 'active-page' : `page-${id}`

  const firstLastPageTestID = (index: number) => {
    if (index === 0) {
      return 'first-page'
    }

    if (index + 1 === totalPages) {
      return `last-page-${index + 1}`
    }

    return
  }

  return (
    <Pagination data-testid="pagination" {...props}>
      <PaginationContent data-testid="total-pages">
        {previousPageToogle}
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem
            key={index}
            data-testid={firstLastPageTestID(index)}
            onClick={() => changePage(index + 1)}
          >
            <PaginationLink
              href="#"
              isActive={currentPage === index + 1}
              className={currentPageLinkClassName(currentPage === index + 1)}
              data-testid={pageTestID(currentPage === index + 1, index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {nextPageToogle}
      </PaginationContent>
    </Pagination>
  )
}
