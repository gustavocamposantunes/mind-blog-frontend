import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";

import { PrivateRoute } from "./private-route";

import {
  makeRemoteGetArticleById,
  makeRemoteListArticles,
  makeRemoteAuthenticateUser,
  makeRemoteRegisterUser,
  makeRemoteRegisterArticle
} from "@/main/factories/usecases";
import {
  ForgotPasswordTemplate,
  HomeTemplate,
  ProfileTemplate
} from "@/presentation/components/templates";
import {
  ArticlesPage,
  ArticlePage,
  RegisterUserPage,
  LoginPage,
  NewArticlePage
} from "@/presentation/pages";
import { useAuthStore } from "@/presentation/store/auth-store";

export const Router = () => {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeTemplate />} />
          <Route path="/articles" element={<ArticlesPage listArticles={makeRemoteListArticles()} />} />
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
  );
};
