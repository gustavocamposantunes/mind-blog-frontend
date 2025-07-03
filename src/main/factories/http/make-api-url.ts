type ApiType = 'mockoon' | 'news'

const baseUrls: Record<ApiType, string> = {
  mockoon: import.meta.env.VITE_MOCKOON_URL,
  news: import.meta.env.VITE_NEWS_API,
}

export const makeApiUrl = (path: string, type: ApiType = 'mockoon'): string => {
  return `${baseUrls[type]}${path}`
}

export const makeApiUrlWithParams = (
  basePath: string,
  params: Record<string, string>,
  type: ApiType = 'mockoon',
): string => {
  const url = new URL(makeApiUrl(basePath, type))
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  return url.toString()
}
