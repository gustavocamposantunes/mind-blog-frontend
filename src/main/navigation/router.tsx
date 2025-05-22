import { LoginTemplate } from "@/presentation/templates/LoginTemplate";
import { RegisterUserTemplate } from "@/presentation/templates/RegisterUserTemplate";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<LoginTemplate />} />
      <Route path="/register" element={<RegisterUserTemplate />} />
    </Routes>
  </BrowserRouter>
)