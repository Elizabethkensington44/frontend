import { Route, Routes } from "react-router";

import AccountPage from "./accountPage/account";
import ClassesPage from "./accountPage/classes";
import TeachersPage from "./accountPage/teachers";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./home/Home";
import Layout from "./layout/Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
