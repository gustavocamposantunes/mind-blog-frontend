import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify'
import { useThemeStore } from '@/presentation/store/theme-store'

import { PrivateRoute } from './private-route'

import {
  makeRemoteGetArticleById,
  makeRemoteListArticles,
  makeRemoteAuthenticateUser,
  makeRemoteRegisterUser,
  makeRemoteRegisterArticle,
  makeRemoteGetProfile,
  makeRemoteUpdateProfile,
  makeRemoteGetNews,
  makeRemoteFavouriteArticle,
  makeRemoteUpdateArticle,
  makeRemoteDeleteArticle,
} from '@/main/factories/usecases'
import {
  ArticlesPage,
  ArticlePage,
  RegisterUserPage,
  LoginPage,
  NewArticlePage,
  ProfilePage,
  ForgotPasswordPage,
  HomePage,
} from '@/presentation/pages'
import { EditArticlePage } from '@/presentation/pages/EditArticlePage'
import { useAuthStore } from '@/presentation/store/auth-store'

export const Router = () => {
  const hydrate = useAuthStore((state) => state.hydrate)
  const hydrateTheme = useThemeStore((s) => s.hydrate)

  useEffect(() => {
    hydrate()
    hydrateTheme()
  }, [hydrate, hydrateTheme])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                listArticles={makeRemoteListArticles()}
                getNews={makeRemoteGetNews()}
              />
            }
          />
          <Route
            path="/articles"
            element={
              <ArticlesPage
                listArticles={makeRemoteListArticles()}
                favouriteArticle={makeRemoteFavouriteArticle()}
                deleteArticle={makeRemoteDeleteArticle()}
              />
            }
          />
          <Route
            path="/articles/:id"
            element={
              <ArticlePage
                getArticletById={makeRemoteGetArticleById()}
                favouriteArticle={makeRemoteFavouriteArticle()}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage authenticateUser={makeRemoteAuthenticateUser()} />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterUserPage registerUser={makeRemoteRegisterUser()} />
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/article/new"
            element={
              <PrivateRoute>
                <NewArticlePage registerArticle={makeRemoteRegisterArticle()} />
              </PrivateRoute>
            }
          />
          <Route
            path="/article/edit/:id"
            element={
              <PrivateRoute>
                <EditArticlePage
                  getArticletById={makeRemoteGetArticleById()}
                  updateArticle={makeRemoteUpdateArticle()}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage
                  getProfile={makeRemoteGetProfile()}
                  updateProfile={makeRemoteUpdateProfile()}
                />
              </PrivateRoute>
            }
          />
        </Routes>
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
