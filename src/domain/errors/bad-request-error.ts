export class BadRequestError extends Error {
  constructor() {
    super('Erro de validação')
    this.name = 'BadRequestError'
  }
}
