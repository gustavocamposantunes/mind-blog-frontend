export const HttpStatusCode = {
    ok: 200,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    serverError: 500
} as const;

export type HttpStatusCode = typeof HttpStatusCode[keyof typeof HttpStatusCode];

export type HttpResponse<T = object> = {
    status: number
    data?: T
}