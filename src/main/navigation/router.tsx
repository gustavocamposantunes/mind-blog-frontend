import { LoginTemplate, RegisterUserTemplate, ForgotPasswordTemplate, NewPostTemplate } from "@/presentation/components/templates";
import { PostsPage } from "@/presentation/pages/PostsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeRemoteListPosts } from "../factories/usecases/makeRemoteListPosts";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PostsPage loadPostsList={makeRemoteListPosts()} />} />
      <Route path="/login" element={<LoginTemplate />} />
      <Route path="/register" element={<RegisterUserTemplate />} />
      <Route path="/forgot-password" element={<ForgotPasswordTemplate />} />
      <Route path="/article/new" element={<NewPostTemplate />} />
    </Routes>
  </BrowserRouter>
)