import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { RegisterArticleSpy } from '../test'
import { renderNewArticlePageWithRouter } from '../test'
import { cleanup, fireEvent, screen, waitFor } from '../test/test-utils'

import { UnexpectedError } from '@/domain/errors'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}))

type SutTypes = {
  registerArticleSpy: RegisterArticleSpy
}

const makeSut = (): SutTypes => {
  const registerArticleSpy = new RegisterArticleSpy()

  renderNewArticlePageWithRouter(registerArticleSpy)

  return {
    registerArticleSpy,
  }
}

describe('NewArticlePage', () => {
  beforeEach(() => {
    cleanup()
  })

  const setupSubmit = () => {
    const titleInput = screen.getByLabelText(/título/i)
    const resumeInput = screen.getByLabelText(/resumo/i)
    const contentInput = screen.getByLabelText(/conteúdo/i)
    const categoryInput = screen.getByLabelText(/categoria/i)
    const tagsInput = screen.getByLabelText(/tags/i)

    const submitButton = screen.getByRole('button', {
      name: /publicar artigo/i,
    })

    fireEvent.change(titleInput, { target: { value: faker.lorem.sentence() } })
    fireEvent.change(resumeInput, {
      target: { value: faker.lorem.paragraph() },
    })
    fireEvent.change(contentInput, {
      target: { value: faker.lorem.paragraph() },
    })
    fireEvent.change(categoryInput, { target: { value: 'Tecnologia' } })
    fireEvent.change(tagsInput, {
      target: { value: 'react, typescript, frontend' },
    })

    fireEvent.click(submitButton)
  }

  it('should render a toast.error when register fails ', async () => {
    const registerArticleSpy = new RegisterArticleSpy()

    const error = new UnexpectedError()

    vi.spyOn(registerArticleSpy, 'register').mockRejectedValueOnce(error)

    renderNewArticlePageWithRouter(registerArticleSpy)

    setupSubmit()

    const errorToastMessage = await screen.findByText(error.message)

    expect(errorToastMessage).toBeTruthy()
  })

  it('should redirect to /articles when cancel button is clicked', async () => {
    makeSut()

    const cancelButton = screen.getByRole('button', { name: /cancelar/i })

    fireEvent.click(cancelButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/articles')
    })
  })

  it('should redirect to /articles when the back button is clicked', async () => {
    makeSut()

    const backButton = screen.getByRole('button', {
      name: /voltar ao dashboard/i,
    })

    fireEvent.click(backButton)

    expect(mockNavigate).toHaveBeenCalledWith('/articles')
  })

  it('should redirect to /articles when submit is successfull', async () => {
    makeSut()

    setupSubmit()

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/articles?page=1&limit=12')
    })
  })

  it('should submit category and parsed tags in register payload', async () => {
    const { registerArticleSpy } = makeSut()

    setupSubmit()

    await waitFor(() => {
      expect(registerArticleSpy.registerPostParams.category).toBe('Tecnologia')
      expect(registerArticleSpy.registerPostParams.tags).toEqual([
        'react',
        'typescript',
        'frontend',
      ])
    })
  })

  it('should render the image when a file is selected', async () => {
    makeSut()

    const file = new File(['image content'], 'image.png', { type: 'image/png' })
    const inputFile = screen.getByLabelText(/imagem de capa/i)

    fireEvent.change(inputFile, { target: { files: [file] } })

    const selectedImage = (await screen.findByTestId(
      'selected-image',
    )) as HTMLImageElement

    expect(selectedImage).toBeDefined()
    expect(selectedImage.src).toBe(
      `data:image/png;base64,${btoa('image content')}`,
    )
    expect(selectedImage.alt).toBe('foto do artigo selecionada')
  })
})
