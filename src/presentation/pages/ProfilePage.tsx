import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { FormHeaderAction } from '../components/molecules/FormHeaderAction'
import { ProfileTemplate } from '../components/templates'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useGetProfile, useUpdateProfile } from '../hooks'
import { useAuthStore } from '../store/auth-store'
import { toBase64 } from '../utils/toBase64'

import type { GetProfileUseCase } from '@/domain/usecases'
import type { UpdateProfileUseCase } from '@/domain/usecases/user/UpdateProfile.usecase'

type ProfilePageProps = {
  getProfile: GetProfileUseCase
  updateProfile: UpdateProfileUseCase
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  getProfile,
  updateProfile,
}) => {
  const [profileParams, setProfileParams] = useState({
    name: '',
    surrname: '',
    image: '',
  })

  const { accessToken } = useAuthStore()

  const { data, status } = useGetProfile(getProfile, accessToken)
  const { mutate } = useUpdateProfile(accessToken, updateProfile)

  const nameParts = data?.data?.name.split(' ')

  const name = nameParts?.[0] ?? ''
  const surrname = nameParts?.slice(1).join(' ') ?? ''

  useEffect(() => {
    setProfileParams({
      image: data?.data?.image ?? '',
      name,
      surrname,
    })
  }, [status === 'success'])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    mutate(
      {
        image: profileParams.image,
        name: `${profileParams.name} ${profileParams.surrname}`,
      },
      {
        onSuccess: () => {
          toast.info('Perfil alterado com sucesso')
        },
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  return (
    <ProfileTemplate>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
        <FormHeaderAction title="Editar Perfil" />
        <section className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {profileParams.image && (
              <img
                className="w-72"
                src={profileParams.image}
                alt="foto de perfil"
                data-testid="selected-image"
              />
            )}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Inserir Imagem de Perfil</Label>
              <Input
                id="picture"
                type="file"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const base64 = await toBase64(file)
                    setProfileParams({
                      ...profileParams,
                      image: base64,
                    })
                  }
                }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name" className="text-stone-950">
                Nome
              </Label>
              <Input
                type="name"
                id="name"
                placeholder="Digite seu nome"
                defaultValue={name}
                data-testid="input-name"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="surrname" className="text-stone-950">
                Sobrenome
              </Label>
              <Input
                type="surrname"
                id="surrname"
                placeholder="Digite seu sobrenome"
                data-testid="input-surrname"
                defaultValue={surrname}
              />
            </div>
          </div>
        </section>
      </form>
    </ProfileTemplate>
  )
}
