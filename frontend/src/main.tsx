import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import App from './App'
import AuthLayout from './components/AuthLayout'
import SignIn from './routes/SignIn'
import Basic from './routes/Basic'
import { ThemeProvider } from '@material-tailwind/react'
import Address from './routes/Address'
import Error from './routes/Error'
import Credential from './routes/Credential'
import Activation from './routes/Activation'
import SignUp from './routes/SignUp'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "signin",
            element: <SignIn />,
          },
          {
            path: "signup",
            element: <SignUp />,
            children: [
              {
                path: "basic",
                element: <Basic />,
              },
              {
                path: "address",
                element: <Address />,
              },
              {
                path: "credential",
                element: <Credential />,
              },
              {
                path: "activate",
                element: <Activation />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
