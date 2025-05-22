import { LoginTemplate, RegisterUserTemplate, ForgotPasswordTemplate } from "@/presentation/templates";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<LoginTemplate />} />
      <Route path="/register" element={<RegisterUserTemplate />} />
      <Route path="/forgot-password" element={<ForgotPasswordTemplate />} />
    </Routes>
  </BrowserRouter>
)