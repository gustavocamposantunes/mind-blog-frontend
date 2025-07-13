import { faker } from '@faker-js/faker'
import { describe, it, vi, beforeEach, expect } from 'vitest'

import {
  GetArticleByIdSpy,
  renderEditArticlePage,
  UpdateArticleSpy,
} from '../test'
import { cleanup, fireEvent, screen, waitFor } from '../test/test-utils'

import { NotFoundError } from '@/domain/errors'

type SutTypes = {
  getArticleByIdSpy: GetArticleByIdSpy
  updateArticleSpy: UpdateArticleSpy
}

const makeSut = (
  getArticleByIdSpy = new GetArticleByIdSpy(),
  updateArticleSpy = new UpdateArticleSpy(),
): SutTypes => {
  renderEditArticlePage(getArticleByIdSpy, updateArticleSpy)

  return {
    getArticleByIdSpy,
    updateArticleSpy,
  }
}

const setupNotFoundArticle = () => {
  const getArticleByIdSpy = new GetArticleByIdSpy()

  const error = new NotFoundError()
  vi.spyOn(getArticleByIdSpy, 'getById').mockRejectedValueOnce(error)

  return {
    getArticleByIdSpy,
  }
}
describe('EditArticlePage', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })
  describe('GetArticleByID', () => {
    it('should render an error if article is not found', async () => {
      const { getArticleByIdSpy } = setupNotFoundArticle()

      makeSut(getArticleByIdSpy)

      await screen.findByText('Erro ao buscar artigo')
    })

    it('should redirect to HomePage if article is not found', async () => {
      const { getArticleByIdSpy } = setupNotFoundArticle()

      makeSut(getArticleByIdSpy)

      await screen.findByTestId('home-page-mock')
    })

    it('should render an skeleton group when the article is not loaded yet', async () => {
      makeSut()

      await screen.findByTestId('skeleton-group')
    })

    it('should render the form header', async () => {
      makeSut()

      await screen.findByTestId('form-header')
    })

    it('should render a toast.success when article is loaded', async () => {
      makeSut()

      const toastSuccessArticleLoaded = await screen.findByText(
        'Artigo carregado com sucesso',
      )

      expect(toastSuccessArticleLoaded).toBeTruthy()
    })

    it('should render the title input filled', async () => {
      const { getArticleByIdSpy } = makeSut()

      const textAreaTitle = await screen.findByTestId('textaread-title')

      await screen.findByText('Artigo carregado com sucesso')

      expect(textAreaTitle).toHaveProperty(
        'value',
        getArticleByIdSpy.data.title,
      )
    })

    it('should render the content input filled', async () => {
      const { getArticleByIdSpy } = makeSut()

      const textAreaContent = await screen.findByTestId('textaread-content')

      await screen.findByText('Artigo carregado com sucesso')

      expect(textAreaContent).toHaveProperty(
        'value',
        getArticleByIdSpy.data.content,
      )
    })

    it('should render the article image', async () => {
      const { getArticleByIdSpy } = makeSut()

      const articleImage = await screen.findByTestId('selected-image')

      await screen.findByText('Artigo carregado com sucesso')

      expect(articleImage).toHaveProperty('src', getArticleByIdSpy.data.image)
    })

    it('should change the article image if a new one is selected', async () => {
      makeSut()

      const inputPicture = await screen.findByTestId('input-picture')

      const file = new File(['image content'], 'image.png', {
        type: 'image/png',
      })

      fireEvent.change(inputPicture, { target: { files: [file] } })

      const articleImage = (await screen.findByTestId(
        'selected-image',
      )) as HTMLImageElement

      await waitFor(() => {
        expect(articleImage.src).toBe(
          `data:image/png;base64,${btoa('image content')}`,
        )
      })
    })
  })

  const setupUpdateFail = () => {
    const updateArticleSpy = new UpdateArticleSpy()

    const error = new NotFoundError()
    vi.spyOn(updateArticleSpy, 'update').mockRejectedValueOnce(error)

    return {
      updateArticleSpy,
      error,
    }
  }

  describe('UpdateArticle', () => {
    it('should don´t submit if fields are not updated', async () => {
      makeSut()

      await screen.findByText('Artigo carregado com sucesso')

      const submitButton = await screen.findByRole('button', {
        name: /salvar/i,
      })

      fireEvent.click(submitButton)

      await screen.findByText('Nenhuma alteração realizada, atualize o artigo!')
    })

    it('should render a toast.error if article update fails', async () => {
      const { updateArticleSpy, error } = setupUpdateFail()

      makeSut(undefined, updateArticleSpy)

      await screen.findByText('Artigo carregado com sucesso')

      const textAreaTitle = await screen.findByTestId('textaread-title')

      fireEvent.change(textAreaTitle, {
        target: { value: faker.lorem.sentence() },
      })

      const submitButton = screen.getByRole('button', { name: /salvar/i })

      fireEvent.click(submitButton)

      await screen.findByText(error.message)
    })
  })
})
