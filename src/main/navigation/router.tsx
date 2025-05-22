import { RegisterUserTemplate, ForgotPasswordTemplate, NewPostTemplate, HomeTemplate, PostTemplate } from "@/presentation/components/templates";
import { PostsPage } from "@/presentation/pages/PostsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeRemoteListPosts } from "../factories/usecases/makeRemoteListPosts";
import { LoginPage } from "@/presentation/pages/LoginPage";
import { makeRemoteAuthenticateUser } from "../factories/usecases/makeRemoteAuthenticateUser";
import { ApiContext } from "@/presentation/contexts";
import { clearCurrentUserAdapter, getCurrentUserAdapter, setCurrentUserAdapter } from "../adapters/CurrentAccountAdapter";

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
        <Route path="/posts" element={<PostsPage loadPostsList={makeRemoteListPosts()} />} />
        <Route path="/posts/:id" element={<PostTemplate />} />
        <Route path="/login" element={<LoginPage authenticateUser={makeRemoteAuthenticateUser()} />} />
        <Route path="/register" element={<RegisterUserTemplate />} />
        <Route path="/forgot-password" element={<ForgotPasswordTemplate />} />
        <Route path="/post/new" element={<NewPostTemplate />} />
      </Routes>
    </BrowserRouter>
  </ApiContext.Provider>
)