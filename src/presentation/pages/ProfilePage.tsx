import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { FormHeader } from '../components/molecules'
import { ProfileTemplate } from '../components/templates'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useGetProfile, useUpdateProfile } from '../hooks'
import { useAuthStore } from '../store/auth-store'
import { buildUpdateProfilePayload } from '../utils/buildUpdateProfilePayload'
import { toBase64 } from '../utils/toBase64'

import type { GetProfileUseCase } from '@/domain/usecases'
import type { UpdateProfileUseCase } from '@/domain/usecases/user/update-profile.usecase'

type ProfilePageProps = {
  getProfile: GetProfileUseCase
  updateProfile: UpdateProfileUseCase
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  getProfile,
  updateProfile,
}) => {
  const [profileParams, setProfileParams] = useState<{
    firstName: string
    lastName: string
    image?: string
  }>({
    firstName: '',
    lastName: '',
    image: '',
  })

  const { accessToken } = useAuthStore()

  const { data, error } = useGetProfile(getProfile, accessToken)
  const { mutate } = useUpdateProfile(accessToken, updateProfile)

  const hasShownSuccessToast = useRef(false)

  useEffect(() => {
    if (data) {
      setProfileParams({
        image: data?.image,
        firstName: data?.firstName,
        lastName: data?.lastName,
      })
      toast.success('Perfil carregado com sucesso')
      hasShownSuccessToast.current = true
    }
  }, [data])

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (data) {
      const payload = buildUpdateProfilePayload(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
        },
        profileParams,
      )

      if (Object.keys(payload).length === 0) return

      mutate(payload, {
        onSuccess: () => {
          toast.success('Perfil alterado com sucesso')
        },
        onError: (error) => {
          toast.error(error.message)
        },
      })
    }
  }

  return (
    <ProfileTemplate error={error}>
      <form className="w-full flex flex-col gap-6" onSubmit={onSubmit}>
        <FormHeader title="Editar Perfil" />
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
                type="first-name"
                id="first-name"
                placeholder="Digite seu nome"
                data-testid="input-first-name"
                value={profileParams.firstName}
                onChange={(e) =>
                  setProfileParams({
                    ...profileParams,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="lastName" className="text-stone-950">
                Sobrenome
              </Label>
              <Input
                type="lastName"
                id="lastName"
                placeholder="Digite seu sobrenome"
                data-testid="input-lastname"
                value={profileParams.lastName}
                onChange={(e) =>
                  setProfileParams({
                    ...profileParams,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </section>
      </form>
    </ProfileTemplate>
  )
}
