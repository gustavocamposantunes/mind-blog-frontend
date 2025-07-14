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
  let previousToogle: undefined | ReactNode

  if (currentPage !== 1) {
    previousToogle = (
      <PaginationItem>
        <PaginationPrevious data-testid="previous-toogle" href="#" />
      </PaginationItem>
    )
  }
  return (
    <Pagination data-testid="pagination" {...props}>
      <PaginationContent data-testid="total-pages">
        {previousToogle}
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem
            key={index}
            data-testid="hint-page"
            onClick={() => changePage(index + 1)}
          >
            <PaginationLink
              href="#"
              isActive={currentPage === index + 1}
              data-testid={
                currentPage === index + 1 ? 'active-page' : `page-${index + 1}`
              }
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
