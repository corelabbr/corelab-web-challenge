import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Global from "./styles/global";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider } from "./context/authContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <Global />
                <App />
                <ToastContainer />
            </AuthProvider>
        </Provider>
    </React.StrictMode>
);
