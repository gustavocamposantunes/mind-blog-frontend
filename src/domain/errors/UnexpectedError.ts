export class UnexpectedError extends Error{
  constructor () {
    super ("Erro inesperado. Tente novamente em breve!");
    this.name = "UnexpectedError";
  }
}