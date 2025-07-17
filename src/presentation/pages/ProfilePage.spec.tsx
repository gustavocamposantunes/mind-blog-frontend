import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  GetProfileSpy,
  UpdateProfileSpy,
  renderProfilePageWithRouter,
} from '../test'
import { cleanup, fireEvent, screen, waitFor } from '../test/test-utils'

import { UnexpectedError } from '@/domain/errors'
import { mockAuthenticateUserModel, mockUser } from '@/domain/test'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}))

const mockAuthStore = mockAuthenticateUserModel()

vi.mock('../store/auth-store', async () => ({
  useAuthStore: () => mockAuthStore,
}))

type SutTypes = {
  getProfileSpy: GetProfileSpy
  updateProfileSpy: UpdateProfileSpy
}

const makeSut = (
  getProfileSpy = new GetProfileSpy(),
  updateProfileSpy = new UpdateProfileSpy(),
): SutTypes => {
  renderProfilePageWithRouter(getProfileSpy, updateProfileSpy)

  return {
    getProfileSpy,
    updateProfileSpy,
  }
}

describe('ProfilePage', () => {
  beforeEach(cleanup)
  describe('GetProfile', () => {
    it('should render the fields with returned data from get profile api', async () => {
      const { getProfileSpy } = makeSut()

      await screen.findByText('Perfil carregado com sucesso')

      const inputName = screen.getByTestId('input-first-name')
      const inputLastName = screen.getByTestId('input-lastname')

      expect(inputName).toHaveProperty('value', getProfileSpy.user.firstName)
      expect(inputLastName).toHaveProperty('value', getProfileSpy.user.lastName)
    })
  })

  describe('UpdateProfile', () => {
    const updateImage = async () => {
      const file = new File(['image content'], 'image.png', {
        type: 'image/png',
      })

      const inputFile = screen.getByLabelText(/inserir imagem de perfil/i)

      fireEvent.change(inputFile, { target: { files: [file] } })

      const selectedImage = (await screen.findByTestId(
        'selected-image',
      )) as HTMLImageElement

      await waitFor(() => {
        expect(selectedImage.src).toBe(
          `data:image/png;base64,${btoa('image content')}`,
        )
      })

      return {
        selectedImage,
      }
    }

    const submitForm = () => {
      const submitButton = screen.getByRole('button', {
        name: /salvar/i,
      })

      fireEvent.click(submitButton)
    }

    it('should render the profile image when a file is selected', async () => {
      makeSut()

      await screen.findByText('Perfil carregado com sucesso')

      const { selectedImage } = await updateImage()

      expect(selectedImage.alt).toBe('foto de perfil')
    })

    it('should render a toast.info when user is updated succesfully', async () => {
      makeSut()

      await screen.findByText('Perfil carregado com sucesso')

      await updateImage()

      submitForm()

      await screen.findByText('Perfil alterado com sucesso')
    })

    it('should render a toast.error if update fails', async () => {
      const updateProfileSpy = new UpdateProfileSpy()

      const error = new UnexpectedError()
      vi.spyOn(updateProfileSpy, 'update').mockRejectedValueOnce(error)

      makeSut(undefined, updateProfileSpy)

      await screen.findByText('Perfil carregado com sucesso')

      await updateImage()

      submitForm()

      await screen.findByText(error.message)
    })

    it('should send only the altered fields to update', async () => {
      const updateProfileSpy = new UpdateProfileSpy()

      vi.spyOn(updateProfileSpy, 'update').mockResolvedValueOnce({
        statusCode: 200,
        data: mockUser(),
      })

      makeSut(undefined, updateProfileSpy)

      await screen.findByText('Perfil carregado com sucesso')
      const firstName = faker.person.firstName()
      const inputFirstName = screen.getByTestId('input-first-name')

      fireEvent.change(inputFirstName, { target: { value: firstName } })

      submitForm()

      await screen.findByText('Perfil alterado com sucesso')

      expect(updateProfileSpy.update).toHaveBeenCalledWith(
        mockAuthStore.accessToken,
        {
          firstName,
        },
      )
    })
  })
})
