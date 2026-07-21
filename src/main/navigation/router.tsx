import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify'

import { PrivateRoute } from './private-route'

import { AccessibilityToolbar } from '@/presentation/components/atoms'
import { useAuthStore } from '@/presentation/store/auth-store'
import { useThemeStore } from '@/presentation/store/theme-store'

const HomeRoute = lazy(async () => {
  const [{ HomePage }, { makeRemoteListArticles }] = await Promise.all([
    import('@/presentation/pages/HomePage'),
    import('@/main/factories/usecases/make-remote-list-articles'),
  ])

  return {
    default: function HomeRoute() {
      return <HomePage listArticles={makeRemoteListArticles()} />
    },
  }
})

const ArticlesRoute = lazy(async () => {
  const [
    { ArticlesPage },
    { makeRemoteListArticles },
    { makeRemoteFavouriteArticle },
  ] = await Promise.all([
    import('@/presentation/pages/ArticlesPage'),
    import('@/main/factories/usecases/make-remote-list-articles'),
    import('@/main/factories/usecases/make-remote-favourite-article'),
  ])

  return {
    default: function ArticlesRoute() {
      return (
        <ArticlesPage
          listArticles={makeRemoteListArticles()}
          favouriteArticle={makeRemoteFavouriteArticle()}
        />
      )
    },
  }
})

const DashboardRoute = lazy(async () => {
  const [
    { DashboardPage },
    { makeRemoteListArticles },
    { makeRemoteDeleteArticle },
  ] = await Promise.all([
    import('@/presentation/pages/DashboardPage'),
    import('@/main/factories/usecases/make-remote-list-articles'),
    import('@/main/factories/usecases/make-remote-delete-article-by-id'),
  ])

  return {
    default: function DashboardRoute() {
      return (
        <DashboardPage
          listArticles={makeRemoteListArticles()}
          deleteArticle={makeRemoteDeleteArticle()}
        />
      )
    },
  }
})

const ArticleRoute = lazy(async () => {
  const [
    { ArticlePage },
    { makeRemoteGetArticleById },
    { makeRemoteFavouriteArticle },
    { makeRemoteListCommentsByArticleId },
    { makeRemoteCommentArticle },
  ] = await Promise.all([
    import('@/presentation/pages/ArticlePage'),
    import('@/main/factories/usecases/make-remote-get-article-by-id'),
    import('@/main/factories/usecases/make-remote-favourite-article'),
    import('@/main/factories/usecases/make-remote-list-comments-by-article-id'),
    import('@/main/factories/usecases/make-remote-comment-article'),
  ])

  return {
    default: function ArticleRoute() {
      return (
        <ArticlePage
          getArticletById={makeRemoteGetArticleById()}
          favouriteArticle={makeRemoteFavouriteArticle()}
          listCommentsByArticleId={makeRemoteListCommentsByArticleId()}
          commentArticle={makeRemoteCommentArticle()}
        />
      )
    },
  }
})

const LoginRoute = lazy(async () => {
  const [{ LoginPage }, { makeRemoteAuthenticateUser }] = await Promise.all([
    import('@/presentation/pages/LoginPage'),
    import('@/main/factories/usecases/make-remote-authenticate-user'),
  ])

  return {
    default: function LoginRoute() {
      return <LoginPage authenticateUser={makeRemoteAuthenticateUser()} />
    },
  }
})

const RegisterRoute = lazy(async () => {
  const [{ RegisterUserPage }, { makeRemoteRegisterUser }] = await Promise.all([
    import('@/presentation/pages/RegisterUserPage'),
    import('@/main/factories/usecases/make-remote-register-user'),
  ])

  return {
    default: function RegisterRoute() {
      return <RegisterUserPage registerUser={makeRemoteRegisterUser()} />
    },
  }
})

const ForgotPasswordRoute = lazy(async () => {
  const { ForgotPasswordPage } =
    await import('@/presentation/pages/ForgotPasswordPage')

  return { default: ForgotPasswordPage }
})

const NewArticleRoute = lazy(async () => {
  const [{ NewArticlePage }, { makeRemoteRegisterArticle }] = await Promise.all(
    [
      import('@/presentation/pages/NewArticlePage'),
      import('@/main/factories/usecases/make-remote-register-articles'),
    ],
  )

  return {
    default: function NewArticleRoute() {
      return <NewArticlePage registerArticle={makeRemoteRegisterArticle()} />
    },
  }
})

const EditArticleRoute = lazy(async () => {
  const [
    { EditArticlePage },
    { makeRemoteGetArticleById },
    { makeRemoteUpdateArticle },
  ] = await Promise.all([
    import('@/presentation/pages/EditArticlePage'),
    import('@/main/factories/usecases/make-remote-get-article-by-id'),
    import('@/main/factories/usecases/make-remote-update-article'),
  ])

  return {
    default: function EditArticleRoute() {
      return (
        <EditArticlePage
          getArticletById={makeRemoteGetArticleById()}
          updateArticle={makeRemoteUpdateArticle()}
        />
      )
    },
  }
})

const ProfileRoute = lazy(async () => {
  const [
    { ProfilePage },
    { makeRemoteGetProfile },
    { makeRemoteUpdateProfile },
  ] = await Promise.all([
    import('@/presentation/pages/ProfilePage'),
    import('@/main/factories/usecases/make-remote-get-profile'),
    import('@/main/factories/usecases/make-remote-update-profile'),
  ])

  return {
    default: function ProfileRoute() {
      return (
        <ProfilePage
          getProfile={makeRemoteGetProfile()}
          updateProfile={makeRemoteUpdateProfile()}
        />
      )
    },
  }
})

const RouteLoadingFallback = () => (
  <main className="min-h-screen bg-background" aria-busy="true" />
)

export const Router = () => {
  const hydrate = useAuthStore((state) => state.hydrate)
  const hydrateTheme = useThemeStore((s) => s.hydrate)

  useEffect(() => {
    hydrate()
    hydrateTheme()
  }, [hydrate, hydrateTheme])

  return (
    <>
      <AccessibilityToolbar />
      <BrowserRouter>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/articles" element={<ArticlesRoute />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardRoute />
                </PrivateRoute>
              }
            />
            <Route path="/articles/:id" element={<ArticleRoute />} />
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/register" element={<RegisterRoute />} />
            <Route path="/forgot-password" element={<ForgotPasswordRoute />} />
            <Route
              path="/article/new"
              element={
                <PrivateRoute>
                  <NewArticleRoute />
                </PrivateRoute>
              }
            />
            <Route
              path="/article/edit/:id"
              element={
                <PrivateRoute>
                  <EditArticleRoute />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileRoute />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}
