import { Button } from "@/presentation/components/ui/button";

import { useNavigate } from "react-router-dom";

interface IFormHeaderAction {
  title: string;
}

export const FormHeaderAction: React.FC<IFormHeaderAction> = ({
  title
}) => {
  const navigate = useNavigate()
  return (
    <section className="flex justify-between w-full">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex gap-2">
        <Button className="orange-btn action-btn" type="button" onClick={() => navigate("/posts")}>
          Cancelar
        </Button>
        <Button className="action-btn" type="submit">
          Salvar
        </Button>
      </div>
    </section>
  )
}