import { ForgotPasswordTemplate, NewPostTemplate, HomeTemplate } from "@/presentation/components/templates";
import { PostsPage, PostPage, RegisterUserPage, LoginPage } from "@/presentation/pages";
import { ApiContext } from "@/presentation/contexts";

import { makeRemoteGetPost, makeRemoteListPosts, makeRemoteAuthenticateUser, makeRemoteRegisterUser } from "@/main/factories/usecases";
import { clearCurrentUserAdapter, getCurrentUserAdapter, setCurrentUserAdapter } from "@/main/adapters/CurrentAccountAdapter";

import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        <Route path="/posts/:id" element={<PostPage fetchPost={makeRemoteGetPost()} />} />
        <Route path="/login" element={<LoginPage authenticateUser={makeRemoteAuthenticateUser()} />} />
        <Route path="/register" element={<RegisterUserPage registerUser={makeRemoteRegisterUser()} />} />
        <Route path="/forgot-password" element={<ForgotPasswordTemplate />} />
        <Route path="/post/new" element={<NewPostTemplate />} />
      </Routes>
    </BrowserRouter>
  </ApiContext.Provider>
)