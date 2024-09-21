import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Layout from "./components/Layout/Layout";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout as the parent component
    children: [
      {
        path: "/", // The Home route
        element: <Home />,
      },
      {
        path: "login", // The Login route
        element: <Login />,
      },
      {
        path: "signup", // The Signup route
        element: <Signup />,
      },
      {
        path: "admin", // The Admin route
        element: <Admin />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
