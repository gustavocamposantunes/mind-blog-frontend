import { PostsTemplate, LoginTemplate, RegisterUserTemplate, ForgotPasswordTemplate, NewPostTemplate } from "@/presentation/templates";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PostsTemplate />} />
      <Route path="/login" element={<LoginTemplate />} />
      <Route path="/register" element={<RegisterUserTemplate />} />
      <Route path="/forgot-password" element={<ForgotPasswordTemplate />} />
      <Route path="/article/new" element={<NewPostTemplate />} />
    </Routes>
  </BrowserRouter>
)