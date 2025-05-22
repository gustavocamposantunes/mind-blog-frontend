import { RegisterUserTemplate, ForgotPasswordTemplate, NewPostTemplate } from "@/presentation/components/templates";
import { PostsPage } from "@/presentation/pages/PostsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeRemoteListPosts } from "../factories/usecases/makeRemoteListPosts";
import { LoginPage } from "@/presentation/pages/LoginPage";
import { makeRemoteAuthenticateUser } from "../factories/usecases/makeRemoteAuthenticateUser";
import { ApiContext } from "@/presentation/contexts";
import { getCurrentUserAdapter, setCurrentUserAdapter } from "../adapters/CurrentAccountAdapter";

export const Router = () => (
  <ApiContext.Provider
    value={{
      setCurrentUser: setCurrentUserAdapter,
      getCurrentUser: getCurrentUserAdapter
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsPage loadPostsList={makeRemoteListPosts()} />} />
        <Route path="/login" element={<LoginPage authenticateUser={makeRemoteAuthenticateUser()} />} />
        <Route path="/register" element={<RegisterUserTemplate />} />
        <Route path="/forgot-password" element={<ForgotPasswordTemplate />} />
        <Route path="/article/new" element={<NewPostTemplate />} />
      </Routes>
    </BrowserRouter>
  </ApiContext.Provider>
)