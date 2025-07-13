import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from '../ui/pagination'

type CustomPaginationProps = {
  totalPages: number
} & React.ComponentProps<'nav'>

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  ...props
}) => (
  <Pagination data-testid="pagination" {...props}>
    <PaginationContent data-testid="total-pages">
      <PaginationItem>
        <PaginationPrevious href="#" />
      </PaginationItem>
      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationItem key={index} data-testid="hint-page">
          <PaginationLink href="#">{index + 1}</PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext href="#" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
)
