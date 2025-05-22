import { LoginTemplate } from "@/presentation/templates/LoginTemplate";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/login" element={<LoginTemplate />} />
    </Routes>
  </BrowserRouter>
)