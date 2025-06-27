import { CustomAvatar } from '../components/molecules/CustomAvatar'
import { FormHeaderAction } from '../components/molecules/FormHeaderAction'
import { ProfileTemplate } from '../components/templates'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useGetProfile } from '../hooks'
import { useAuthStore } from '../store/auth-store'

import type { GetProfileUseCase } from '@/domain/usecases'

type ProfilePageProps = {
  getProfile: GetProfileUseCase
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ getProfile }) => {
  const { accessToken } = useAuthStore()

  const { data } = useGetProfile(getProfile, accessToken)

  const nameParts = data?.data?.name.split(' ')

  return (
    <ProfileTemplate>
      <form className="w-full flex flex-col gap-6">
        <FormHeaderAction title="Editar Perfil" />
        <section className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <CustomAvatar
              className="w-[200px] h-[200px]"
              src={data?.data?.image}
            />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Inserir Imagem de Perfil</Label>
              <Input id="picture" type="file" />
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
                defaultValue={nameParts?.[0] ?? ''}
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
                defaultValue={nameParts?.slice(1).join(' ')}
              />
            </div>
          </div>
        </section>
      </form>
    </ProfileTemplate>
  )
}
