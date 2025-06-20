import { ForgotPasswordTemplate, HomeTemplate, ProfileTemplate } from "@/presentation/components/templates";
import { ArticlesPage, ArticlePage, RegisterUserPage, LoginPage, NewArticlePage } from "@/presentation/pages";
import { ApiContext } from "@/presentation/contexts";

import { makeRemoteGetArticleById, makeRemoteListArticles, makeRemoteAuthenticateUser, makeRemoteRegisterUser, makeRemoteRegisterArticle } from "@/main/factories/usecases";
import { clearCurrentUserAdapter, getCurrentUserAdapter, setCurrentUserAdapter } from "@/main/adapters/CurrentAccountAdapter";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./private-route";

export const Router = () => (
  <ApiContext.Provider
    value={{
      setCurrentUser: setCurrentUserAdapter,
      getCurrentUser: getCurrentUserAdapter,
      clearCurrentUser: clearCurrentUserAdapter
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />} />
        <Route path="/articles" element={<ArticlesPage loadPostsList={makeRemoteListArticles()} />} />
        <Route path="/articles/:id" element={<ArticlePage getArticletById={makeRemoteGetArticleById()} />} />
        <Route path="/login" element={<LoginPage authenticateUser={makeRemoteAuthenticateUser()} />} />
        <Route path="/register" element={<RegisterUserPage registerUser={makeRemoteRegisterUser()} />} />
        <Route path="/forgot-password" element={<ForgotPasswordTemplate />} />
        <Route path="/article/new"
          element={
            <PrivateRoute>
              <NewArticlePage registerArticle={makeRemoteRegisterArticle()} />
            </PrivateRoute>
          }
        />
        <Route path="/profile"
          element={
            <PrivateRoute>
              <ProfileTemplate />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </ApiContext.Provider>
)