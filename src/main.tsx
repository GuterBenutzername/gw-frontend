import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Dashboard from "./routes/dashboard/Dashboard";
import Grades from "./routes/grades/Grades";
import Imports from "./routes/imports/Imports";
import Settings from "./routes/settings/Settings";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "grades",
        element: <Grades />,
      },
      {
        path: "imports",
        element: <Imports />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

