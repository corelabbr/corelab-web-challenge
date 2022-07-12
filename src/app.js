import { BrowserRouter, Route, Routes } from "react-router-dom";
import IsLoadingContextProvider from "./contexts/IsLoadingContext";
import UserContextProvider from "./contexts/UserContext";
import { GlobalStyle, ResetStyle } from "./GlobalStyle";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <ResetStyle />
      <GlobalStyle />
      <UserContextProvider>
        <IsLoadingContextProvider>
          <Routes>
            <Route path={"/"} element={<Home />} />
          </Routes>
        </IsLoadingContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}