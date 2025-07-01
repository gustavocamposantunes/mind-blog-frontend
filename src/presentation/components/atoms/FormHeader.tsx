interface IFormHeader {
  title: string
  description: string
}

export const FormHeader: React.FC<IFormHeader> = () => (
  <>
    <h2 className="text-2xl font-bold">Conectar</h2>
    <p className="mt-1 text-lg">
      Acesse sua conta para acompanhar e publicar artigos exclusivos sobre
      inovação e tecnologia.
    </p>
  </>
)
