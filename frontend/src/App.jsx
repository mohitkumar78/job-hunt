import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./components/Home";
import Companies from "./Admin/Companies";
import Layout from "./components/Layout/Layout";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import CreateCompany from "./Admin/CreateCompany";
import { Toaster } from "sonner";
import CompanySetup from "./Admin/CompanySetup";
import AdminJob from "./Admin/AdminJob";
import PostJob from "./Admin/PostJob";
import Applicants from "./Admin/Applicants";
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
        path: "job", // The Jobs route
        element: <Jobs />,
      },
      {
        path: "/discription/:jobid", // <-- Fix the route here
        element: <JobDescription />,
      },
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin/Companies", // The Admin route
        element: <Companies />,
      },
      {
        path: "admin/createCompany",
        element: <CreateCompany />,
      },
      {
        path: "admin/companies/:_id",
        element: <CompanySetup />,
      },
      {
        path: "/admin/job",
        element: <AdminJob />,
      },
      {
        path: "/admin/jobs/create",
        element: <PostJob />,
      },
      {
        path: "/admin/jobs/:_id/applicants",
        element: <Applicants />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="bg-[#003566] h-full">
      <Toaster position="top-right" />

      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
