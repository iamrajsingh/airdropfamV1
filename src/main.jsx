import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/AuthLayout.jsx";
import { Airdrop, Dashboard, Home, Login } from "./pages";
import routes from "./Routes.js";

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: routes.airdrop + ":slug",
        element: <Airdrop />,
      },
      {
        path: routes.login,
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: routes.dashboard,
        element: (
          <AuthLayout authentication>
            <Dashboard />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
