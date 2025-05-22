import { LoginTemplate, RegisterUserTemplate, ForgotPasswordTemplate, NewArticleTemplate } from "@/presentation/templates";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<LoginTemplate />} />
      <Route path="/register" element={<RegisterUserTemplate />} />
      <Route path="/forgot-password" element={<ForgotPasswordTemplate />} />
      <Route path="/article/new" element={<NewArticleTemplate />} />
    </Routes>
  </BrowserRouter>
)