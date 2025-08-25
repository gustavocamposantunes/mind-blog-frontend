export class BadRequestError extends Error {
  constructor(validationMessage = 'Erro de validação') {
    super(validationMessage)
    this.name = 'BadRequestError'
  }
}
