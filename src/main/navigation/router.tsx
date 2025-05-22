import { LoginTemplate } from "@/presentation/templates/LoginTemplate";
import { RegisterTemplate } from "@/presentation/templates/RegisterTemplate";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<LoginTemplate />} />
      <Route path="/register" element={<RegisterTemplate />} />
    </Routes>
  </BrowserRouter>
)