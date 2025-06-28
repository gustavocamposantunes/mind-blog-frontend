import { beforeEach, describe, expect, it, vi } from 'vitest'

import { GetProfileSpy, PutProfileSpy } from '../test'
import { cleanup, fireEvent, render, screen, waitFor } from '../test/test-utils'

import { ProfilePage } from './ProfilePage'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}))

type SutTypes = {
  getProfileSpy: GetProfileSpy
  putProfileSpy: PutProfileSpy
}

const makeSut = (): SutTypes => {
  const getProfileSpy = new GetProfileSpy()
  const putProfileSpy = new PutProfileSpy()

  render(
    <ProfilePage getProfile={getProfileSpy} updateProfile={putProfileSpy} />,
  )

  return {
    getProfileSpy,
    putProfileSpy,
  }
}

describe('ProfilePage', () => {
  beforeEach(cleanup)
  it('should render the fields with returned data from get profile api', async () => {
    const { getProfileSpy } = makeSut()

    const nameParts = getProfileSpy.user.name.split(' ')
    const name = nameParts[0]
    const surrname = nameParts.slice(1).join(' ')

    const inputName = screen.getByTestId('input-name') as HTMLInputElement
    const inputSurrname = screen.getByTestId(
      'input-surrname',
    ) as HTMLInputElement

    await waitFor(() => {
      expect(inputName.value).toBe(name)
      expect(inputSurrname.value).toBe(surrname)
    })
  })

  const updateImage = async () => {
    const file = new File(['image content'], 'image.png', { type: 'image/png' })

    const inputFile = screen.getByLabelText(/inserir imagem de perfil/i)

    fireEvent.change(inputFile, { target: { files: [file] } })

    const selectedImage = (await screen.findByTestId(
      'selected-image',
    )) as HTMLImageElement

    return {
      selectedImage,
    }
  }

  it('should render the profile image when a file is selected', async () => {
    makeSut()

    const { selectedImage } = await updateImage()
    await waitFor(() => {
      expect(selectedImage.src).toBe(
        `data:image/png;base64,${btoa('image content')}`,
      )
    })

    expect(selectedImage.alt).toBe('foto de perfil')
  })

  it('should render a toast.info when user is updated succesfully', async () => {
    makeSut()

    await updateImage()

    const submitButton = screen.getByRole('button', {
      name: /salvar/i,
    })

    fireEvent.click(submitButton)

    await screen.findByText('Perfil alterado com sucesso')
  })
})
