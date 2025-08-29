import { describe, it, expect, beforeEach } from 'vitest'

import { CustomPagination } from './CustomPagination'

import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@/presentation/test/test-utils'

const makeSut = (currentPage = 1, totalPages = 1) => {
  const changePage = (page: number) => {
    currentPage = page
  }

  const { rerender } = render(
    <CustomPagination
      currentPage={currentPage}
      totalPages={totalPages}
      changePage={changePage}
    />,
  )

  return {
    rerender: () =>
      rerender(
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          changePage={changePage}
        />,
      ),
  }
}

describe('CustomPagination', () => {
  beforeEach(cleanup)
  it('should not render the previous page toogle if current page is the first', () => {
    makeSut()

    const previousTooglePagination = screen.queryByTestId(
      'previous-page-toogle',
    )

    expect(previousTooglePagination).not.toBeInTheDocument()
  })

  it('should go to previous page when toogle is clicked', () => {
    const { rerender } = makeSut(2, 5)

    const pageTwo = screen.getByTestId('page-2')

    expect(pageTwo).toHaveAttribute('data-active', 'true')

    const previousTooglePagination = screen.getByTestId('previous-page-toogle')

    const pageOne = screen.getByTestId('page-1')

    fireEvent.click(previousTooglePagination)

    rerender()

    expect(pageOne).toHaveAttribute('data-active', 'true')
  })

  it('should not render the next page toogle if current page is the last', () => {
    makeSut(5, 5)

    const nextPageTooglePagination = screen.queryByTestId('next-page-toogle')

    expect(nextPageTooglePagination).not.toBeInTheDocument()
  })

  it('should go to next page when toogle is clicked', () => {
    const { rerender } = makeSut(1, 5)

    const pageOne = screen.getByTestId('page-1')

    expect(pageOne).toHaveAttribute('data-active', 'true')

    const nextTooglePagination = screen.getByTestId('next-page-toogle')

    const pageTwo = screen.getByTestId('page-2')

    fireEvent.click(nextTooglePagination)

    rerender()

    expect(pageTwo).toHaveAttribute('data-active', 'true')
  })

  it('should render ellipsis there is more than 5 pages', () => {
    makeSut(1, 7)

    const paginationEllipsis = screen.getByTestId('pagination-ellipsis')

    expect(paginationEllipsis).toBeInTheDocument()
  })

  it('should render pages whithout ellipsis when there is 5 or less pages', () => {
    makeSut(1, 5)

    const paginationEllipsis = screen.queryByTestId('pagination-ellipsis')

    expect(paginationEllipsis).not.toBeInTheDocument()
  })

  it('should render pages correctly', () => {
    makeSut(1, 5)

    const pageOne = screen.getByTestId('page-1')
    const pageFive = screen.getByTestId('page-5')

    expect(pageOne).toBeInTheDocument()
    expect(pageFive).toBeInTheDocument()
  })

  it('should change the current page on click', () => {
    const { rerender } = makeSut(1, 5)

    const pageOne = screen.getByTestId('page-1')

    expect(pageOne).toHaveAttribute('data-active', 'true')

    const pageTwo = screen.getByTestId('page-2')

    fireEvent.click(pageTwo)

    rerender()

    expect(pageTwo).toHaveAttribute('data-active', 'true')
  })
})
