import React from 'react'
import App from './App.jsx'
import SignUp from './assets/routes/SignUp.jsx';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Dashboard from './assets/routes/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);