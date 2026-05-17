import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { ProfileTemplate } from '../components/templates'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useGetProfile, useUpdateProfile } from '../hooks'
import { useAuthStore } from '../store/auth-store'
import { buildUpdateProfilePayload } from '../utils/buildUpdateProfilePayload'
import { getBase64FromInputFile } from '../utils/getBase64FromInputFile'

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
    fullName: string
    image?: string
  }>({
    fullName: '',
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
        fullName: data?.fullName,
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
          fullName: data.fullName,
          image: data.image,
        },
        profileParams,
      )

      if (Object.keys(payload).length === 0) {
        toast.info('Nenhuma alteração realizada, atualize o perfil!')
        return
      }

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

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <ProfileTemplate error={error}>
      <form
        className="w-full max-w-2xl mx-auto flex flex-col gap-8"
        onSubmit={onSubmit}
      >
        {/* Header */}
        <div className="border-b border-border pb-6">
          <h1 className="text-3xl font-bold text-foreground">
            Configurações do Perfil
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie suas informações pessoais
          </p>
        </div>

        {/* Profile Photo Section */}
        <section className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            {profileParams.image && (
              <img
                className="h-32 w-32 rounded-full border-4 border-border object-cover"
                src={profileParams.image}
                alt="foto de perfil"
                data-testid="selected-image"
              />
            )}
            {!profileParams.image && (
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-muted">
                <span className="text-sm text-muted-foreground">Sem foto</span>
              </div>
            )}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture" className="text-center text-foreground">
                Adicionar uma imagem de perfil
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const base64 = await getBase64FromInputFile(e)
                  if (base64) {
                    setProfileParams((previous) => ({
                      ...previous,
                      image: base64,
                    }))
                  }
                }}
                data-testid="input-image"
              />
            </div>
          </div>
        </section>

        {/* Profile Information */}
        <section className="flex flex-col gap-6 border-border border-t border-b py-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="fullName" className="font-semibold text-foreground">
              Nome Completo
            </Label>
            <Input
              type="text"
              id="fullName"
              placeholder="Digite seu nome completo"
              data-testid="input-fullName"
              value={profileParams.fullName}
              onChange={(e) =>
                setProfileParams({
                  ...profileParams,
                  fullName: e.target.value,
                })
              }
              className="text-foreground"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" className="font-semibold text-foreground">
              E-mail
            </Label>
            <Input
              type="email"
              id="email"
              value={data?.email || ''}
              disabled
              className="bg-muted text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">
              E-mail não pode ser alterado
            </p>
          </div>
        </section>

        {/* Account Information */}
        {data && (
          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase text-foreground">
              Informações da conta
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  Tipo de conta
                </span>
                <span className="text-sm font-semibold text-foreground">
                  Usuário
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  Membro desde
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {formatDate(data.createdAt)}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded hover:bg-cyan-600 transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </ProfileTemplate>
  )
}
