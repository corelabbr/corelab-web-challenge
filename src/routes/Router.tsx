import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";

export function Router() {
  return(
    <Routes>
      <Route path="/" element={<Dashboard />}/>
    </Routes>
  )
}